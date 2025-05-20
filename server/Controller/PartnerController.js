import db from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Stripe from 'stripe';
import paypal from '@paypal/payouts-sdk';
import { sendPasswordResetEmail } from '../services/emailService.js';
import dotenv from 'dotenv';
import { Op } from 'sequelize';

dotenv.config();
// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Initialize PayPal environment
const paypalClient = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
  // For production:
  // const environment = new paypal.core.LiveEnvironment(clientId, clientSecret);

  return new paypal.core.PayPalHttpClient(environment);
};

// The sign up Controller 
export const signUp = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    // Check if user already exists
    const existingUser = await db.Profile.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Generate unique affiliate code
    const generateAffiliateCode = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = '';
      for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
    };

    let affiliate_code;
    let isCodeUnique = false;

    // Keep generating until we get a unique code
    while (!isCodeUnique) {
      affiliate_code = generateAffiliateCode();
      const existingCode = await db.Profile.findOne({
        where: { affiliate_code },
      });
      if (!existingCode) {
        isCodeUnique = true;
      }
    }

    // Create user with optional payment details
    const user = await db.Profile.create({
      email,
      password_hash,
      full_name: fullName,
      affiliate_code,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error('Error during signup:', error);
  }
};

// The login Controller
export const login = async (req, res) => {
  try {
    console.log('Received login request:', req.body);
    const { email, password } = req.body;

    // Find user by email
    const user = await db.Profile.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log("found the user with the given email", user);
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// The get profile Controller
export const getProfile = async (req, res) => {
  try {
    console.log('Received get profile request:', req.user);
    const userId = req.user.id;

    // Find user by ID
    const user = await db.Profile.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate total earnings from approved referrals
    const totalEarnings = await db.Referral.sum('commission', {
      where: {
        affiliate_id: userId,
        status: 'completed'
      }
    }) || 0;

    // Calculate total withdrawn from completed payouts
    const totalWithdrawn = await db.Payout.sum('amount', {
      where: {
        affiliate_id: userId,
        status: 'completed'
      }
    }) || 0;

    // Calculate withdrawable balance
    const withdrawableBalance = totalEarnings - totalWithdrawn;

    const affiliateCode = user.affiliate_code;
    const referralLink = `${process.env.ZONGEA_TECH_DONATION_SITE}/donate?ref=${affiliateCode}`;

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        affiliateCode,
        referralLink,
        phone: user.phone,
        company: user.company,
        bio: user.bio,
        position: user.position,
        avatarUrl: user.avatar_url,
        totalEarnings,
        totalWithdrawn,
        withdrawableBalance,
        stripeAccountId: user.stripe_account_id,
        paypalEmail: user.paypal_email
      }
    });
  } catch (error) {
    console.error('Error in getProfile:', error);
    res.status(500).json({ error: error.message });
  }
};
// The update profile Controller
// The forgot password Controller
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await db.Profile.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { id: user.id, type: 'password_reset' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Update user with reset token
    await db.Profile.update(
      { reset_token: resetToken },
      { where: { id: user.id } }
    );

    // Send password reset email
    await sendPasswordResetEmail(email, resetToken);
    res.status(200).json({ message: 'Password reset instructions sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// The reset password Controller
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.type !== 'password_reset') {
      return res.status(401).json({ error: 'Invalid or expired reset token' });
    }

    // Find user
    const user = await db.Profile.findOne({
      where: {
        id: decoded.id,
        reset_token: token
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Invalid reset token' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    await db.Profile.update(
      {
        password_hash: hashedPassword,
        reset_token: null
      },
      { where: { id: user.id } }
    );

    res.status(200).json({ message: 'Password successfully reset' });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid reset token' });
    }
    res.status(500).json({ error: error.message });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const userId = req.user.id;
    const avatarUrl = `/uploads/${req.file.filename}`;

    // Update user's avatar URL in database
    await db.Profile.update(
      { avatar_url: avatarUrl },
      { where: { id: userId } }
    );

    res.status(200).json({ avatarUrl });
  } catch (error) {
    console.error('Error uploading avatar:', error);
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    console.log('Received update profile request:', req.body);
    const userId = req.user.id;
    const {
      fullName,
      avatarUrl,
      phone,
      company,
      position,
      bio,
      stripeAccountId,
      paypalEmail
    } = req.body;

    // Update user profile
    const [updated, [updatedUser]] = await db.Profile.update(
      {
        full_name: fullName,
        avatar_url: avatarUrl,
        phone,
        company,
        position,
        bio,
        stripe_account_id: stripeAccountId,
        paypal_email: paypalEmail,
      },
      {
        where: { id: userId },
        returning: true,
      }
    );

    if (!updated) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Format the response to match the frontend expectations
    const userResponse = {
      id: updatedUser.id,
      email: updatedUser.email,
      fullName: updatedUser.full_name,
      phone: updatedUser.phone,
      company: updatedUser.company,
      position: updatedUser.position,
      bio: updatedUser.bio,
      avatarUrl: updatedUser.avatar_url,
      referralLink: `${process.env.ZONGEA_TECH_DONATION_SITE}/donate?ref=${updatedUser.affiliate_code}`,
      stripeAccountId: updatedUser.stripe_account_id,
      paypalEmail: updatedUser.paypal_email
    };

    res.status(200).json({ user: userResponse });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: error.message });
  }
};

// The get all Referral Controller
export const getAllReferrals = async (req, res) => {
  try {
    console.log('Received get all referrals request:', req.user);
    const userId = req.user.id;

    // Find all referrals for the user
    const referrals = await db.Referral.findAll({ where: { affiliate_id: userId } });

    res.status(200).json(referrals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// The get Referral state Controller
export const getReferralsState = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const state = await db.Referral.findAll({
      where: { affiliate_id: req.user.id },
      attributes: ['id', 'amount', 'commission', 'created_at'],

    });

    console.log(state);

    res.status(200).json(state);
  } catch (error) {
    console.error('Error fetching referral state:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// The get Payouts Controller
export const getPayouts = async (req, res) => {
  try {
    console.log('Received get payouts request:', req.user);

    let payouts;

    // If admin, get all payouts with affiliate info
    if (req.user.role === 'admin') {
      console.log('admin getting payouts')
      payouts = await db.Payout.findAll({
        include: [{
          model: db.Profile,
          attributes: ['id', 'email', 'full_name', 'stripe_account_id', 'paypal_email']
        }],
        order: [['created_at', 'DESC']]
      });

      // Format the response for admin view
      const formattedPayouts = payouts.map(payout => ({
        id: payout.id,
        amount: payout.amount,
        status: payout.status,
        payment_method: payout.payment_method,
        payment_details: payout.payment_details,
        created_at: payout.created_at,
        affiliate: payout.Profile ? {
          id: payout.Profile.id,
          email: payout.Profile.email,
          full_name: payout.Profile.full_name,
          stripe_account_id: payout.Profile.stripe_account_id,
          paypal_email: payout.Profile.paypal_email
        } : null
      }));

      res.status(200).json(formattedPayouts);
    } else {
      // For regular users, only get their own payouts
      payouts = await db.Payout.findAll({
        where: { affiliate_id: req.user.id },
        order: [['created_at', 'DESC']]
      });

      // Format the response for user view
      const formattedPayouts = payouts.map(payout => ({
        id: payout.id,
        amount: payout.amount,
        status: payout.status,
        payment_method: payout.payment_method,
        payment_details: payout.payment_details,
        created_at: payout.created_at
      }));

      res.status(200).json(formattedPayouts);
    }
  } catch (error) {
    console.error('Error in getPayouts:', error);
    res.status(500).json({ error: error.message });
  }
};

// The request Payout Controller
export const requestPayout = async (req, res) => {
  try {
    console.log('Received request payout request:', req.user);
    const userId = req.user.id;
    const { amount, paymentMethod } = req.body;
    console.log('Amount:', amount, 'Payment Method:', paymentMethod);

    // Validate payment method
    if (!['stripe', 'paypal'].includes(paymentMethod)) {
      return res.status(400).json({
        error: 'Invalid payment method. Please choose either Stripe or PayPal.'
      });
    }

    // Check for pending payouts
    const pendingPayout = await db.Payout.findOne({
      where: {
        affiliate_id: userId,
        status: {
          [Op.in]: ['pending_review', 'approved', 'processing']
        }
      }
    });

    if (pendingPayout) {
      return res.status(400).json({
        error: 'You have a pending payout request. Please wait until it is processed.',
        pendingPayout: {
          id: pendingPayout.id,
          status: pendingPayout.status,
          amount: pendingPayout.amount,
          created_at: pendingPayout.created_at
        }
      });
    }

    // If payment method is Stripe, handle onboarding
    if (paymentMethod === 'stripe') {
      const profile = await db.Profile.findByPk(userId);
      
      if (!profile.stripe_account_id) {
        // Create Stripe account link for onboarding
        const account = await stripe.accounts.create({
          type: 'express',
          country: 'US',
          email: req.user.email,
          capabilities: {
            transfers: { requested: true }
          }
        });

        // Save the account ID
        await profile.update({ stripe_account_id: account.id });

        // Create account link for onboarding
        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: `${process.env.PARTNER_FRONTEND_URL}/dashboard/payouts?session_id=${account.id}`,
          return_url: `${process.env.PARTNER_FRONTEND_URL}/dashboard/payouts?success=true`,
          type: 'account_onboarding'
        });

        return res.status(200).json({
          redirect: true,
          url: accountLink.url
        });
      }

      // Check if Stripe account is properly set up
      const account = await stripe.accounts.retrieve(profile.stripe_account_id);
      
      if (!account.details_submitted || !account.payouts_enabled) {
        const accountLink = await stripe.accountLinks.create({
          account: profile.stripe_account_id,
          refresh_url: `${process.env.PARTNER_FRONTEND_URL}/dashboard/payouts?session_id=${profile.stripe_account_id}`,
          return_url: `${process.env.PARTNER_FRONTEND_URL}/dashboard/payouts?success=true`,
          type: 'account_onboarding'
        });

        return res.status(200).json({
          redirect: true,
          url: accountLink.url
        });
      }
    }
    // Minimum payout amount
    const MINIMUM_PAYOUT_AMOUNT = 50; // $50 minimum payout

    if (amount < MINIMUM_PAYOUT_AMOUNT) {
      return res.status(400).json({
        error: `Minimum payout amount is $${MINIMUM_PAYOUT_AMOUNT}`
      });
    }

    // Calculate total earnings from approved referrals
    const totalEarnings = await db.Referral.sum('commission', {
      where: {
        affiliate_id: userId,
        status: 'completed'
      }
    }) || 0;

    // Calculate total withdrawn from completed payouts
    const totalWithdrawn = await db.Payout.sum('amount', {
      where: {
        affiliate_id: userId,
        status: 'completed'
      }
    }) || 0;

    // Calculate available balance
    const availableBalance = totalEarnings - totalWithdrawn;

    if (amount > availableBalance) {
      return res.status(400).json({
        error: `Insufficient balance. Available balance: $${availableBalance.toFixed(2)}`
      });
    }

    // Get user profile for payment details
    const profile = await db.Profile.findByPk(userId);

    // Create payout record
    const payout = await db.Payout.create({
      affiliate_id: userId,
      amount,
      status: 'pending_review',
      payment_method: paymentMethod,
      payment_details: {
        stripeAccountId: profile.stripe_account_id,
        paypalEmail: profile.paypal_email,
        request_date: new Date().toISOString(),
        available_balance: availableBalance
      }
    });

    // Send notification to admin about new payout request
    // TODO: Implement admin notification system

    res.status(200).json({
      message: 'Payout request created successfully',
      payout: {
        id: payout.id,
        amount: payout.amount,
        status: payout.status,
        payment_method: payout.payment_method,
        created_at: payout.created_at
      }
    });
  } catch (error) {
    console.error('Error in requestPayout:', error);
    res.status(500).json({ error: error.message });
  }
};

// The update payout status Controller
export const updatePayoutStatus = async (req, res) => {
  try {
    const { payoutId } = req.params;
    const { status, adminNote } = req.body;

    // Start transaction
    const transaction = await db.sequelize.transaction();

    try {
      // Find payout
      const payout = await db.Payout.findByPk(payoutId, { transaction });
      if (!payout) {
        await transaction.rollback();
        return res.status(404).json({ error: 'Payout not found' });
      }

      // Validate status transition
      const validTransitions = {
        pending_review: ['approved', 'rejected'],
        approved: ['processing'],
        processing: ['completed', 'failed'],
        completed: [],
        failed: ['pending_review'],
        rejected: ['pending_review']
      };

      if (!validTransitions[payout.status]?.includes(status)) {
        await transaction.rollback();
        return res.status(400).json({
          error: `Invalid status transition from ${payout.status} to ${status}`
        });
      }

      // Update payout status
      await payout.update({
        status,
        admin_note: adminNote,
        processed_at: ['completed', 'failed'].includes(status) ? new Date() : null
      }, { transaction });

      // Additional validations for processing status
      if (status === 'processing') {
        // Get user's profile
        const profile = await db.Profile.findByPk(payout.affiliate_id, { transaction });
        if (!profile) {
          throw new Error('Profile not found');
        }

        // Validate payment details based on method
        if (payout.payment_method === 'stripe') {
          if (!payout.payment_details.stripeAccountId) {
            throw new Error('Stripe account ID is missing in payout details');
          }
          if (payout.payment_details.stripeAccountId !== profile.stripe_account_id) {
            throw new Error('Stripe account ID mismatch');
          }
        } else if (payout.payment_method === 'paypal') {
          if (!payout.payment_details.paypalEmail) {
            throw new Error('PayPal email is missing in payout details');
          }
          if (payout.payment_details.paypalEmail !== profile.paypal_email) {
            throw new Error('PayPal email mismatch');
          }
        }
      }

      // If status is processing, initiate payment
      if (status === 'processing') {
        let paymentResponse;
        try {
          if (payout.payment_method === 'stripe') {
            paymentResponse = await stripe.transfers.create({
              amount: Math.round(payout.amount * 100),
              currency: 'usd',
              destination: payout.payment_details.stripeAccountId,
              description: `Payout #${payout.id}`
            });
          } else if (payout.payment_method === 'paypal') {
            const client = paypalClient();
            const request = new paypal.payouts.PayoutsPostRequest();
            
            const requestBody = {
              sender_batch_header: {
                sender_batch_id: `payout_${payout.id}_${Date.now()}`,
                email_subject: 'Your payout has been processed!'
              },
              items: [{
                recipient_type: 'EMAIL',
                amount: {
                  value: Number(payout.amount).toFixed(2),
                  currency: 'USD'
                },
                receiver: payout.payment_details.paypalEmail,
                note: `Payout #${payout.id}`
              }]
            };

            request.requestBody(requestBody);
            paymentResponse = await client.execute(request);
            console.log('PayPal Payout Response:', paymentResponse);
          }

          // Store payment response
          await payout.update({
            payment_details: {
              ...payout.payment_details,
              provider_response: paymentResponse,
              provider_payout_id: payout.payment_method === 'stripe' ?
                paymentResponse.id :
                paymentResponse.result?.batch_header?.payout_batch_id || null
            }
          }, { transaction });
        } catch (paymentError) {
          // If payment fails, mark as failed and store error details
          await payout.update({
            status: 'failed',
            admin_note: `Payment failed: ${paymentError.message}`,
            payment_details: {
              ...payout.payment_details,
              provider_response: paymentError.response || paymentError.message,
              provider_payout_id: null
            }
          }, { transaction });

          console.error('Payment processing failed:', paymentError);
          // Continue to commit the transaction with failed status
        }
      }

      // If completed, update balances
      if (status === 'completed') {
        // Recalculate balances
        const totalEarnings = await db.Referral.sum('commission', {
          where: {
            affiliate_id: payout.affiliate_id,
            status: 'completed'
          },
          transaction
        }) || 0;

        const totalWithdrawn = await db.Payout.sum('amount', {
          where: {
            affiliate_id: payout.affiliate_id,
            status: 'completed'
          },
          transaction
        }) || 0;

        // Store final balances
        await payout.update({
          payment_details: {
            ...payout.payment_details,
            final_balance: totalEarnings - totalWithdrawn
          }
        }, { transaction });
      }

      // Commit the transaction
      await transaction.commit();

      // Send notification to affiliate about status change
      // TODO: Implement notification system

      res.status(200).json({
        message: `Payout status updated to ${status}`,
        payout
      });
    } catch (error) {
      await transaction.rollback();
      console.error('Error in updatePayoutStatus:', error);
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    console.error('Error in updatePayoutStatus:', error);
    res.status(500).json({ error: error.message });
  }
};

// Export all controllers
// export {
//   signUp,
//   login,
//   getProfile,
//   forgotPassword,
//   resetPassword,
//   uploadAvatar,
//   updateProfile,
//   getAllReferrals,
//   getReferralsState,
//   getPayouts,
//   requestPayout,
//   updatePayoutStatus
// };
