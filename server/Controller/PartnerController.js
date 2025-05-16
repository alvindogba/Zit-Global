import db from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { sendPasswordResetEmail } from '../services/emailService.js';
dotenv.config();


// The sign up Controller 
export const signUp = async (req, res) => {
  try {
    console.log('Received signup request:', req.body);
    const { email, password, fullName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const affiliateCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    // check for existing user
    const existingUser = await db.Profile.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const newUser = await db.Profile.create({
      email,
      password_hash: hashedPassword,
      full_name: fullName,
      affiliate_code: affiliateCode,
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: { id: newUser.id, email: newUser.email, fullName: newUser.fullName } });    
    } catch (error) {   
    res.status(500).json({ error: error.message });
    console.error('Error during signup:', error);
    }
    }
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

    res.status(200).json({ token, user: { id: user.id, email: user.email, fullName: user.full_name } });
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
    console.log(user.dataValues)
    

    const affiliateCode = user.affiliate_code;
    const referralLink = `${process.env.ZONGEA_TECH_DONATION_SITE}/donate?ref=${affiliateCode}`;

    res.status(200).json({ user: 
      { id: user.id, 
        email: user.email, 
        fullName: user.full_name, 
        affiliateCode, referralLink,
        phone: user.phone,
        company: user.company,
        bio: user.bio,
        position: user.position,
        avatarUrl: user.avatar_url

      } });
  } catch (error) {
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
    const { fullName, avatarUrl, phone, company, position, bio } = req.body;

    // Update user profile
    const [updated, [updatedUser]] = await db.Profile.update(
      {
        full_name: fullName,
        avatar_url: avatarUrl,
        phone,
        company,
        position,
        bio,
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
    const userId = req.user.id;

    // Find all payouts for the user
    const payouts = await db.Payout.findAll({ where: { affiliate_id: userId } });

    res.status(200).json(payouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// The request Payout Controller
export const requestPayout = async (req, res) => {
  try {
    console.log('Received request payout request:', req.user);
    const userId = req.user.id;
    const { amount } = req.body;

    // Find user
    const user = await db.Profile.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create payout
    const payout = await db.Payout.create({
      affiliate_id: userId,
      amount,
      status: 'pending',
    });

    res.status(200).json(payout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

