// routes/donateRouter.js
import express from 'express';

const donationRouter = express.Router();

// Create payment intent (for both Stripe and PayPal)
donationRouter.post('/payment-intent', createPaymentIntent);


export default donationRouter;