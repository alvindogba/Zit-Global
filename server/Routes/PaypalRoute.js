import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import db from "../models/index.js";
import { sendDonationReceipt } from '../utils/donationEmailService.js';

dotenv.config();

const paypalRouter = express.Router();
const PAYPAL_API = process.env.PAYPAL_API;
const FRONTEND_URL=process.env.FRONTEND_URL;


// Helper function to get PayPal access token
async function getPayPalAccessToken() {
  const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_CLIENT_SECRET;
  const PAYPAL_API = process.env.PAYPAL_API;

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64");
  const tokenResponse = await axios.post(
    `${PAYPAL_API}/v1/oauth2/token`,
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return tokenResponse.data.access_token;
}

// Helper function to generate receipt number
function generateReceipt() {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `DON-${year}-${random}`;
}

// Handle one-time donations (unchanged)
paypalRouter.post("/save-donation", async (req, res) => {
  console.log("Processing one-time donation:", req.body);
  try {
    const PAYPAL_API = process.env.PAYPAL_API;
    const { transactionId } = req.body;

    const accessToken = await getPayPalAccessToken();

    // Verify PayPal Transaction
    const paypalResponse = await axios.get(
      `${PAYPAL_API}/v2/checkout/orders/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (paypalResponse.data.status !== "COMPLETED") {
      return res.status(400).json({ message: "Payment not verified" });
    }

    // Save donation to DB
    const donation = await db.Donations.create({
      ...req.body,
      status: "completed",
      giftType: "one-time"
    });

    // Send receipt
    const receiptNumber = generateReceipt();
    await sendDonationReceipt(donation, receiptNumber);

    res.json({ success: true, donationId: donation.id });

  } catch (error) {
    console.error("Error processing one-time donation:", error.response?.data || error.message);
    res.status(500).json({ message: "Error processing one-time donation" });
  }
});

// Handle subscription donations
paypalRouter.post("/create-Paypalsubscription", async (req, res) => {
  try {
    // Extract donor's details from the request body.
    const { firstName, lastName, email, phone, state, country,} = req.body.donorInfo;
    const { amount } = req.body; // Extract donation amount from the request body.

  console.log(`user firstname:, ${firstName}, lastname ${lastName}, ${email}, userphone ${phone}, state ${state}, Ammount ${amount}, `)

    // Step 1: Retrieve PayPal OAuth 2.0 Access Token.
    const credentials = `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`;
    const base64Credentials = Buffer.from(credentials).toString('base64');

    const tokenResponse = await axios({
      method: 'post',
      url: `${PAYPAL_API}/v1/oauth2/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${base64Credentials}`,
      },
      data: 'grant_type=client_credentials',
    });
    const accessToken = tokenResponse.data.access_token;

    // Step 2: Build the subscription payload (without shipping_address).
    const subscriptionPayload = {
      plan_id: process.env.PAYPAL_MONTHLY_PLAN_ID, // Pre-configured billing plan ID
      plan_overridden: true,              // Signal that pricing from the plan will be overridden.
      start_time: "2025-11-01T00:00:00Z",  // Set the start time accordingly
      subscriber: {
        name: {
          given_name: firstName,
          surname: lastName,
        },
        email_address: email,
        phone: {
          phone_number: {
            national_number: phone,
          },
        },
        adress:{
          country_code: country,
          adress_line_1: state
        }
      },
        // Override the billing cycle pricing with the user selected donation amount.
        billing_cycles: [
          {
            pricing_scheme: {
              fixed_price: {
                value: String(amount),  // Ensure the value is a string.
                currency_code: "USD"
              }
            }
          }
        ],
      
      application_context: {
        brand_name: "Zongea Institute of Technology",          // Adjust to your brand name
        locale: "en-US",
        shipping_preference: "NO_SHIPPING",        // No shipping information
        user_action: "SUBSCRIBE_NOW",
        payment_method: {
          payer_selected: "PAYPAL",
          payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
        },
        return_url: `${FRONTEND_URL}/paypal-success`, // Your success URL
        cancel_url: `${FRONTEND_URL}`, // Your cancel URL
      },

      
      // Use custom_id to store the donationAmount or any metadata you need.
      custom_id: `donation_${amount}`,
      note: "Monthly subscription for donation",
    };

    // Step 3: Call the PayPal Subscriptions API using Axios.
    const subscriptionResponse = await axios({
      method: 'post',
      url: `${PAYPAL_API}/v1/billing/subscriptions`, // Use production URL for live deployment.
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'PayPal-Request-Id': 'SUBSCRIPTION-' + new Date().toISOString(), // Ensure uniqueness per request.
        'Prefer': 'return=representation',
      },
      data: subscriptionPayload,
    });

    // Step 4: Return the PayPal subscription response to the frontend.
    res.status(200).json(subscriptionResponse.data);
  } catch (error) {
    console.error("Error creating subscription:", error.response?.data || error.message);
    res.status(500).json({ error: 'Error creating subscription' });
  }
});


// The confirm Route
paypalRouter.post('/confirm-subscription', async (req, res) => {
  const{ subscriptionId, baToken, token } = req.body;

  if (!subscriptionId) {
    return res.status(400).json({ error: 'Subscription ID is required' });
  }

  try {
    // Step 1: Obtain an access token from PayPal using your credentials.
    const credentials = `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`;
    const base64Credentials = Buffer.from(credentials).toString('base64');

    const tokenResponse = await axios.post(
      `${PAYPAL_API}/v1/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${base64Credentials}`,
        }
      }
    );
    const accessToken = tokenResponse.data.access_token;

    // Step 2: Retrieve subscription details from PayPal.
    const subscriptionResponse = await axios.get(
      `${PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      }
    );
    const subscriptionData = subscriptionResponse.data;
    console.log(subscriptionData)

    // Step 3: Ensure the subscription is approved.
    // In a successful flow, you expect the status to be something like ACTIVE.
    if (subscriptionData.status === 'APPROVAL_PENDING') {
      return res.status(400).json({ error: 'Subscription not yet approved.' });
    }

    // Step 4: Extract donation and subscriber details.
    // The custom_id field should be in the format "donation_<amount>"
    const donationAmountString = subscriptionData.custom_id.replace('donation_', '');
    const donationAmount = parseFloat(donationAmountString);
    const donorEmail = subscriptionData.subscriber.email_address;
    const firstName = subscriptionData.subscriber.name?.given_name || '';
    const lastName = subscriptionData.subscriber.name?.surname || '';

    // Step 5: Record the donation details in the database.
    const donation = {
      subscriptionId: subscriptionData.id,
      email: donorEmail,
      donationAmount,
      firstName,
      lastName,
      status: subscriptionData.status,
    }
    

    // const receiptNumber = generateReceipt();
    // await sendDonationReceipt(donation, receiptNumber);  

    // Step 6: Return the stored donation record.
    res.status(200).json({
      message: 'Subscription confirmed and donation recorded.',
      });
  } catch (error) {
    console.error("Error confirming subscription:", error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to confirm subscription.' });
  }
});
export default paypalRouter;
