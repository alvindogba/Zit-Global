import express from 'express';
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
console.log("Creating Payment Intent", amountInCents);
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

    

    // Affiliate logic
     // ✅ Affiliate logic
    if (req.body.ref_code) {
      const affiliate = await db.Profile.findOne({
        where: { affiliate_code: req.body.ref_code }
      });

      if (affiliate) {
        const commissionRate = 0.15; // or your preferred rate
        const commission = req.body.amount * commissionRate;

        await db.Referral.create({
          affiliate_id: affiliate.id,
          transaction_id: donation.transactionId || `DON-${Date.now()}`, // fallback if needed
          amount: donation.amount,
          commission,
          status: 'completed',
        });
      }
    }
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
    res.json({ success: true, donationId: donation.id });
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
  console.log(req.body)
  try {
    const { email, amount, currency, interval, ref_code} = req.body;

    // 1. Create Stripe Customer
    const customer = await stripe.customers.create({

      metadata: {
        // Add any additional donor info here
         
      ...req.body
      }
    });

    // 2. Create Dynamic Price
    const price = await stripe.prices.create({
      unit_amount: amount,
      currency: currency || 'usd',
      recurring: { interval: interval || 'month' },
      product: process.env.STRIPE_PRODUCT_ID, // Your donation product ID
    });

    // 3. Create Checkout Session
   const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  customer: customer.id,
  line_items: [{
    price: price.id,
    quantity: 1,
  }],
  mode: 'subscription',
  success_url: `${process.env.FRONTEND_URL}/stripe-monthly-success?sessionId={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.FRONTEND_URL}/donate`,
  metadata: {
    ref_code, // ✅ move here
  },
  subscription_data: {
    metadata: {
      ref_code, // optional, only needed if you need it on the Subscription too
    }
  }
});

    res.json({ sessionId: session.id });

  } catch (err) {
    console.error('Subscription error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Sucess page route 
stripeRouter.get("/get-subscription-success/:sessionId", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    const customer = await stripe.customers.retrieve(session.customer);
    const subscription = await stripe.subscriptions.retrieve(session.subscription);

    const amount = session.amount_total / 100;
    const transactionId = subscription.id;
    const interval = subscription.items.data[0].price.recurring.interval;
    const createdAt = new Date(session.created * 1000);
    const ref_code = session.metadata?.ref_code || null;

    console.log(ref_code)
    // Save to Donations table
 const existingDonation = await db.Donations.findOne({
  where: { transactionId }
});

if (!existingDonation) {
  // Insert only if not already present
  await db.Donations.create({
    amount,
    paymentMethod: 'stripe',
    transactionId,
    email: customer.email,
    firstName: customer.name?.split(' ')[0] || '',
    lastName: customer.name?.split(' ')[1] || '',
    phone: '',
    country: '',
    state: '',
    giftType: 'monthly',
    ref_code,
    status: 'completed',
  });

  // Insert referral if applicable
  if (ref_code) {
    const referrer = await db.Profile.findOne({ where: { affiliate_code: ref_code } });
    if (referrer) {
      const commission = +(amount * 0.15).toFixed(2);
      await db.Referral.create({
        affiliate_id: referrer.id,
        transaction_id: transactionId,
        amount,
        commission,
        status: 'pending',
      });
    }
  }
} else {
  console.log('Donation already recorded for transaction:', transactionId);
}


    res.json({
      success: true,
      email: customer.email,
      amount,
      interval,
      createdAt,
      subscriptionId: transactionId,
    });

  } catch (err) {
    console.error('Error fetching subscription success data:', err);
    res.status(500).json({ error: 'Failed to fetch subscription details' });
  }
});




export default stripeRouter;