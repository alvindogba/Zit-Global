import express from 'express';
import rateLimit from 'express-rate-limit';

// Configure rate limiter
const webhookLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many webhook requests from this IP'
});
import db from "../models/index.js"
import Stripe from "stripe";
import dotenv from 'dotenv';
import { sendDonationReceipt } from '../utils/donationEmailService.js';

// Load environment variables first
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const stripeRouter = express.Router();// Create an Express Router

// Create payment intent
stripeRouter.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;

    // Validate and convert to cents
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }
    const amountInCents = Math.round(amount * 100); // Convert dollars to cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents, // Use converted value
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message }); // Send detailed error
  }
});


stripeRouter.post('/save-donation', async (req, res) => {
  try {
    console.log("Saving Donation Donation Record", req.body);
    // Create donation record
    const donation = await db.Donations.create({
    
      ...req.body,
      status: 'completed',
    });
    // Generate receipt
    const generateReceipt = () => {
        const year = new Date().getFullYear();
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `DON-${year}-${random}`;
      };
      
    const receiptBuffer = await generateReceipt(donation);
    // Send confirmation email
    console.log(donation, receiptBuffer);
    await sendDonationReceipt(donation, receiptBuffer);
    res.json({ success: true, donationId: donation._id });
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ error: 'Failed to save donation' });
  }
});


// Getting the Sucessful donation details for Stripe
stripeRouter.get('/get-success-donation/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;
    const donation = await db.Donations.findOne({ where: { transactionId } });
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    res.json(donation);
  } catch (error) {
    console.error('Error fetching donation details:', error);
    res.status(500).json({ error: 'Failed to fetch donation details' });
  }
});


// The Strip Subscription End point 
stripeRouter.post("/create-subscription-session", async (req, res) => {
  try {
    const { 
      email, amount, currency, interval,
      firstName, lastName, phone, 
      address, address2, city, state, zip, country 
    } = req.body;

    // 1. Input Validation
    if (!email || !amount || !firstName || !lastName) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (isNaN(amount)) {
      return res.status(400).json({ error: "Amount must be a valid number" });
    }

    // 2. Create or Retrieve Customer
    const customer = await stripe.customers.create({
      email,
      name: `${firstName} ${lastName}`,
      phone,
      address: {
        line1: address,
        line2: address2 || undefined,
        city,
        state,
        postal_code: zip,
        country
      },
      metadata: {
        signup_ip: req.ip,
        user_agent: req.get('user-agent')
      }
    });

    // 3. Create Price with Proper Validation
    const priceParams = {
      unit_amount: Math.round(amount * 100), // Convert to cents
      currency: (currency || 'usd').toLowerCase(),
      recurring: {
        interval: interval || 'month',
        interval_count: 1
      },
      product: process.env.STRIPE_PRODUCT_ID,
      metadata: {
        campaign: 'recurring_donation'
      }
    };

    // Validate price parameters
    if (!['day', 'week', 'month', 'year'].includes(priceParams.recurring.interval)) {
      return res.status(400).json({ error: "Invalid subscription interval" });
    }

    const price = await stripe.prices.create(priceParams);

    // Generate receipt number
    const generateReceiptNumber = () => {
      const year = new Date().getFullYear();
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      return `DON-${year}-${random}`;
    };
    const receiptNumber = generateReceiptNumber();

    // 4. Create Checkout Session with Enhanced Metadata
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: customer.id,
      line_items: [{
        price: price.id,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/monthly-success?session_id={CHECKOUT_SESSION_ID}&receipt=${receiptNumber}`,
      cancel_url: `${process.env.FRONTEND_URL}/donate?canceled=true`,
      subscription_data: {
        metadata: {
          donor_email: email,
          donation_type: 'recurring',
          initial_amount: price.unit_amount / 100,
          receipt_number: receiptNumber
        }
      }
    });

    // 5. Save donation record to database
    const donation = await db.Donations.create({
      amount: amount,
      paymentMethod: 'card',
      transactionId: session.id,
      firstName,
      lastName,
      email,
      phone,
      address,
      address2,
      city,
      state,
      zip,
      country,
      giftType: 'monthly',
      receiptNumber,
      status: 'pending'
    });

    // 6. Send confirmation email
    await sendDonationReceipt({
      ...donation.toJSON(),
      currency: currency || 'usd',
      donationType: 'monthly subscription'
    });

    // 7. Send response
    res.json({ 
      sessionId: session.id,
      customerId: customer.id,
      receiptNumber
    });

  } catch (err) {
    console.error('Subscription error:', {
      message: err.message,
      type: err.type,
      code: err.code,
      stack: err.stack
    });
    
    // Log error to database
    try {
      await db.ErrorLog.create({
        type: 'subscription_error',
        error: JSON.stringify({
          message: err.message,
          code: err.code,
          type: err.type
        }),
        metadata: JSON.stringify(req.body)
      });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }

    // Return Stripe error details to client
    res.status(err.statusCode || 500).json({
      error: err.raw?.message || "Payment processing failed",
      code: err.code
    });
  }
});



// Stripe Webhook handler
// Get subscription details for monthly donations
stripeRouter.get('/subscription-details/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    console.log('Fetching subscription details for session:', sessionId);

    // Retrieve the checkout session
    console.log('Retrieving checkout session...');
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log('Session retrieved:', session);
    
    if (!session) {
      console.log('No session found');
      return res.status(404).json({ error: 'Session not found' });
    }

    // Get the subscription ID from the session
    const subscriptionId = session.subscription;
    console.log('Subscription ID from session:', subscriptionId);
    
    if (!subscriptionId) {
      console.log('No subscription ID found in session');
      return res.status(404).json({ error: 'No subscription found for this session' });
    }

    // Retrieve the subscription details
    console.log('Retrieving subscription details...');
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    console.log('Subscription details:', subscription);

    // Get customer details
    console.log('Retrieving customer details...');
    const customer = await stripe.customers.retrieve(subscription.customer);
    console.log('Customer details:', customer);

    // Format the response
    const response = {
      subscriptionId: subscription.id,
      status: subscription.status,
      currentPeriodStart: subscription.current_period_start,
      currentPeriodEnd: subscription.current_period_end,
      amount: subscription.items.data[0].price.unit_amount / 100,
      currency: subscription.currency,
      interval: subscription.items.data[0].price.recurring.interval,
      customerEmail: customer.email,
      customerName: customer.name,
      receiptNumber: session.metadata?.receipt_number // Changed from subscription_data to metadata
    };

    console.log('Sending response:', response);
    res.json(response);
  } catch (error) {
    console.error('Error fetching subscription details:', error);
    res.status(500).json({ error: 'Failed to fetch subscription details' });
  }
});

stripeRouter.post('/webhook', webhookLimiter, express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        
        // Update donation status and add transaction ID
        await db.Donations.update(
          {
            status: 'completed',
            transactionId: session.subscription || session.payment_intent
          },
          {
            where: {
              receiptNumber: session.subscription_data?.metadata?.receipt_number
            }
          }
        );

        // Send confirmation email if not already sent
        const donation = await db.Donations.findOne({
          where: {
            receiptNumber: session.subscription_data?.metadata?.receipt_number
          }
        });

        if (donation && !donation.emailSent) {
          await sendDonationReceipt(donation);
          await db.Donations.update(
            { emailSent: true },
            { where: { id: donation.id } }
          );
        }
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        // Record successful recurring payment
        await db.Donations.create({
          amount: invoice.amount_paid / 100,
          paymentMethod: 'card',
          transactionId: invoice.payment_intent,
          status: 'completed',
          giftType: 'monthly',
          // Get customer details from metadata
          ...(await stripe.customers.retrieve(invoice.customer)).metadata
        });
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object;
        // Log failed payment
        await db.ErrorLog.create({
          type: 'payment_failed',
          error: JSON.stringify(failedInvoice),
          metadata: JSON.stringify({
            customerId: failedInvoice.customer,
            subscriptionId: failedInvoice.subscription
          })
        });
        break;

      case 'customer.subscription.deleted':
        const subscription = event.data.object;
        // Update subscription status
        await db.Donations.update(
          { status: 'cancelled' },
          {
            where: {
              transactionId: subscription.id
            }
          }
        );
        break;
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    await db.ErrorLog.create({
      type: 'webhook_error',
      error: JSON.stringify(err),
      metadata: JSON.stringify(event || {})
    });
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

export default stripeRouter;