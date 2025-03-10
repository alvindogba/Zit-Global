import checkoutNodeJssdk from '@paypal/checkout-server-sdk';
import dotenv from 'dotenv';

dotenv.config();

const environment =
process.env.PAYPAL_MODE === 'sandbox'
    ? new checkoutNodeJssdk.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET)
    : new checkoutNodeJssdk.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);

const paypalClient = new checkoutNodeJssdk.core.PayPalHttpClient(environment);

export default paypalClient;
