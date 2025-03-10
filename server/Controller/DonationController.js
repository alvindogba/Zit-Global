// controllers/donateController.js
import Stripe from 'stripe';
import { PayPalClient } from '../utils/Client.js';
import { sendDonationEmail } from '../utils/donationEmailService.js';
import { generateReceipt } from '../utils/receiptGenerator.js';
import db from '../models/index.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

// Input validation middleware
const validateDonationInput = (data) => {
  const errors = [];
  if (!data.amount || data.amount <= 0) errors.push('Invalid amount');
  if (!data.currency || !['USD', 'EUR', 'GBP'].includes(data.currency)) errors.push('Invalid currency');
  if (data.amount > 50000) errors.push('Amount exceeds maximum limit');
  return errors;
};

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency, donationType, email } = req.body;
    
    // Validate input
    const errors = validateDonationInput({ amount, currency });
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Create donation record
    const donation = await db.Donation.create({
      amount,
      currency,
      email,
      status: 'pending',
      type: donationType
    });

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: {
        donationId: donation.id,
        email
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      donationId: donation.id
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const donationId = paymentIntent.metadata.donationId;
      const email = paymentIntent.metadata.email;

      // Update donation status
      const donation = await db.Donation.findByPk(donationId);
      if (donation) {
        donation.status = 'completed';
        donation.paymentId = paymentIntent.id;
        await donation.save();

        // Generate receipt
        const receipt = await generateReceipt(donation);
        
        // Send confirmation email
        await sendDonationEmail(email, {
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          receipt
        });
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};

export const createPaypalOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    
    // Validate input
    const errors = validateDonationInput({ amount, currency });
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const order = await PayPalClient.createOrder(amount, currency);
    res.json(order);
  } catch (error) {
    console.error('PayPal order creation error:', error);
    res.status(500).json({ error: 'Failed to create PayPal order' });
  }
};

export const capturePaypalPayment = async (req, res) => {
  try {
    const { orderID } = req.body;
    const captureData = await PayPalClient.capturePayment(orderID);
    
    // Create donation record
    const donation = await db.Donation.create({
      amount: captureData.amount,
      currency: captureData.currency,
      email: captureData.email,
      status: 'completed',
      paymentId: orderID,
      type: 'paypal'
    });

    // Generate receipt and send email
    const receipt = await generateReceipt(donation);
    await sendDonationEmail(captureData.email, {
      amount: captureData.amount,
      currency: captureData.currency,
      receipt
    });

    res.json(captureData);
  } catch (error) {
    console.error('PayPal capture error:', error);
    res.status(500).json({ error: 'Failed to capture PayPal payment' });
  }
};

export const getDonationStatus = async (req, res) => {
  try {
    const { donationId } = req.params;
    const donation = await db.Donation.findByPk(donationId);
    
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    res.json({
      status: donation.status,
      amount: donation.amount,
      currency: donation.currency,
      createdAt: donation.createdAt
    });
  } catch (error) {
    console.error('Error fetching donation status:', error);
    res.status(500).json({ error: 'Failed to fetch donation status' });
  }
};