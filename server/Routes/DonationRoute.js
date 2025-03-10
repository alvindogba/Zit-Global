// routes/donateRouter.js
import express from 'express';
import {
  createPaymentIntent,
  capturePaypalPayment,
  handleStripeWebhook,
  getDonationStatus,
  createPaypalOrder
} from '../Controller/DonationController.js';

const donationRouter = express.Router();

// Stripe routes
donationRouter.post('/payment-intent', createPaymentIntent);
donationRouter.post('/stripe/webhook', 
  express.raw({ type: 'application/json' }), 
  handleStripeWebhook
);

// PayPal routes
donationRouter.post('/paypal/create', createPaypalOrder);
donationRouter.post('/paypal/capture', capturePaypalPayment);

// Get donation status
donationRouter.get('/status/:donationId', getDonationStatus);

export default donationRouter;