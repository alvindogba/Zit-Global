import express from 'express';
import { handleStripeWebhook, handlePayPalWebhook } from '../controllers/DonationController.js';


// Webhook endpoints
router.post('/stripe-webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);
router.post('/paypal-webhook', express.json(), handlePayPalWebhook);

export default router;