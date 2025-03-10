import Stripe from 'stripe';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Updated to latest stable version
});

export const createStripePaymentIntent = async (amount, currency) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount is in the smallest unit, e.g., cents
      currency,
    });
    return paymentIntent.client_secret;
  } catch (error) {
    console.error('Error creating Stripe Payment Intent:', error);
    throw new Error('Error creating Stripe Payment Intent');
  }
};
