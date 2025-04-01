import paypal from '@paypal/checkout-server-sdk';
import dotenv from 'dotenv';

dotenv.config();
const FRONTEND_URL = process.env.FRONTEND_URL;
export const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
export const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
  console.error('Missing PayPal Client ID or Secret');
  process.exit(1); // Stop server if credentials are missing
}

// Set up PayPal environment and client
const environment = new paypal.core.SandboxEnvironment(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET);
const client = new paypal.core.PayPalHttpClient(environment);

export const createPaypalPayment = async (amount, currency) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: amount.toString(),
        },
      },
    ],
    application_context: {
      return_url: `${FRONTEND_URL}/payment-success`, // Redirect URL after approval
      cancel_url: `${FRONTEND_URL}/payment-cancel`,  // Cancel URL if payment is cancelled
    },
  });

  try {
    const order = await client.execute(request);
    const approvalUrl = order.result.links.find((link) => link.rel === 'approve')?.href;

    if (!approvalUrl) {
      throw new Error('Approval URL not found');
    }

    return approvalUrl;
  } catch (error) {
    console.error('Error creating PayPal payment:', error.message);
    throw new Error('Error creating PayPal payment');
  }
};
