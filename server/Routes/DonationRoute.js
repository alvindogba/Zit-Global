import express from 'express';
import { body } from 'express-validator';
import { createPaymentIntent, saveDonation, handleStripeWebhook, handlePayPalWebhook, getDonationDetails } from '../controllers/DonationController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { rateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Validation middleware
const donationValidation = [
  body('amount').isFloat({ min: 1, max: 10000 }).withMessage('Amount must be between $1 and $10,000'),
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('state').trim().isLength({ min: 2, max: 2 }).withMessage('Valid state code is required'),
  body('zip').trim().matches(/^\d{5}(-\d{4})?$/).withMessage('Valid ZIP code is required'),
];

// Create payment intent (Stripe)
router.post(
  '/create-payment-intent',
  rateLimiter,
  [body('amount').isFloat({ min: 1 }).withMessage('Valid amount is required')],
  validateRequest,
  createPaymentIntent
);

// Save donation details
router.post(
  '/save-donation',
  rateLimiter,
  donationValidation,
  validateRequest,
  saveDonation
);

// Get donation details
router.get(
  '/donation/:transactionId',
  rateLimiter,
  getDonationDetails
);

// Webhook endpoints
router.post('/stripe-webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);
router.post('/paypal-webhook', express.json(), handlePayPalWebhook);

export default router;