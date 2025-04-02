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
    const { firstName, lastName, email, address, city, state, zip, amount, paymentMethod, transactionId, giftType } = req.body;
    console.log(req.body);
    // Create donation record
    const donation = await db.Donations.create({
      firstName,
      lastName,
      email,
      address,
      city,
      state,
      zip,
      amount,
      paymentMethod,
      transactionId,
      giftType,
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




export default stripeRouter;