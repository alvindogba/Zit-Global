import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import db from "../models/index.js";
import { sendDonationReceipt } from '../utils/donationEmailService.js';

dotenv.config();

const paypalRouter = express.Router();
const PAYPAL_API = process.env.PAYPAL_API;
const FRONTEND_URL = process.env.FRONTEND_URL;


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
      giftType: "one-time",

    });

    // Affiliate logic
    // ✅ Affiliate logic
    if (req.body.ref_code) {
      const affiliate = await db.Profile.findOne({
        where: { affiliate_code: req.body.ref_code }
      });

      if (affiliate) {
        const commissionRate = 0.15; // or your preferred rate
        const commission = req.body.amount * commissionRate;

        await db.Referral.create({
          affiliate_id: affiliate.id,
          transaction_id: donation.transactionId || `DON-${Date.now()}`, // fallback if needed
          amount: donation.amount,
          commission,
          status: 'pending',
        });
      }
    }

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
paypalRouter.post("/create-paypalsubscription", async (req, res) => {
  try {
    // Extract donor's details and donation amount from the request body.
    const { firstName, lastName, email, phone, state, country } = req.body.donorInfo;
    const { amount, ref_code } = req.body;

    console.log(`User details - First Name: ${firstName}, Last Name: ${lastName}, Email: ${email}, Phone: ${phone}, State: ${state}, Country: ${country}, Amount: ${amount}`);

    // Step 1: Retrieve PayPal OAuth 2.0 Access Token.
    const credentials = `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`;
    const base64Credentials = Buffer.from(credentials).toString('base64');

    const tokenResponse = await axios({
      method: 'post',
      url: `${process.env.PAYPAL_API}/v1/oauth2/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${base64Credentials}`,
      },
      data: 'grant_type=client_credentials',
    });

    const accessToken = tokenResponse.data.access_token;

    // Step 2: Create a Product (if not already created).
    const productPayload = {
      name: "Donation",
      description: "Custom donation product",
      type: "SERVICE",
      category: "CHARITY",
    };

    const productResponse = await axios({
      method: 'post',
      url: `${process.env.PAYPAL_API}/v1/catalogs/products`,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: productPayload,
    });

    const productId = productResponse.data.id;

    // Step 3: Create a Plan with the donor's specified amount.
    const planPayload = {
      product_id: productId,
      name: `Donation Plan - $${amount}`,
      description: `Monthly donation plan for $${amount}`,
      billing_cycles: [
        {
          frequency: {
            interval_unit: "MONTH",
            interval_count: 1,
          },
          tenure_type: "REGULAR",
          sequence: 1,
          total_cycles: 0, // Infinite billing cycles
          pricing_scheme: {
            fixed_price: {
              value: amount.toFixed(2),
              currency_code: "USD",
            },
          },
        },
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee_failure_action: "CONTINUE",
        payment_failure_threshold: 3,
      },
    };

    const planResponse = await axios({
      method: 'post',
      url: `${process.env.PAYPAL_API}/v1/billing/plans`,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: planPayload,
    });

    const planId = planResponse.data.id;

    // Step 4: Activate the Plan if its status is "CREATED" or "INACTIVE".
    if (
      planResponse.data.status === "CREATED" ||
      planResponse.data.status === "INACTIVE"
    ) {
      await axios({
        method: 'post',
        url: `${process.env.PAYPAL_API}/v1/billing/plans/${planId}/activate`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
    } else {
      console.log("Plan is already active or in a status that doesn't require activation.");
    }

    // Step 5: Create a Subscription using the plan.
    const subscriptionPayload = {
      plan_id: planId,
      custom_id: JSON.stringify({ amount, ref_code }), // ← Store both values
      application_context: {
        brand_name: "Zongea Institute of Technology",
        locale: "en-US",
        shipping_preference: "NO_SHIPPING",
        user_action: "SUBSCRIBE_NOW",
        return_url: `${process.env.FRONTEND_URL}/paypal-success`,
        cancel_url: `${process.env.FRONTEND_URL}`,
      },
    };


    const subscriptionResponse = await axios({
      method: 'post',
      url: `${process.env.PAYPAL_API}/v1/billing/subscriptions`,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: subscriptionPayload,
    });



    // Step 6: Return the subscription approval URL to the frontend.
    const approvalUrl = subscriptionResponse.data.links.find(link => link.rel === 'approve').href;
    res.status(200).json({ approvalUrl });
  } catch (error) {
    console.error("Error creating subscription:", error.response?.data || error.message);
    res.status(500).json({ error: 'Error creating subscription' });
  }
});


paypalRouter.post('/confirm-subscription', async (req, res) => {
  const { subscriptionId, baToken, token } = req.body;

  if (!subscriptionId) {
    return res.status(400).json({ error: 'Subscription ID is required' });
  }

  try {
    // Step 1: Obtain an access token from PayPal using your credentials.
    const credentials = `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`;
    const base64Credentials = Buffer.from(credentials).toString('base64');

    const tokenResponse = await axios.post(
      `${process.env.PAYPAL_API}/v1/oauth2/token`,
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
      `${process.env.PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      }
    );
    const subscriptionData = subscriptionResponse.data;
    console.log("Subscription Data:", subscriptionData);

    // Step 3: Ensure the subscription is approved (i.e. not still pending).
    // You might want to adjust this check if live subscriptions use a different status name.
    if (subscriptionData.status === 'APPROVAL_PENDING') {
      return res.status(400).json({ error: 'Subscription not yet approved.' });
    }

    // Step 4: Extract donation and subscriber details.
    let donationAmount = 0;
    let ref_code = null;

    if (subscriptionData.custom_id && typeof subscriptionData.custom_id === 'string') {
      try {
        const customData = JSON.parse(subscriptionData.custom_id);
        donationAmount = parseFloat(customData.amount) || 0;
        ref_code = customData.ref_code || null;
      } catch (err) {
        console.warn("Invalid custom_id format:", subscriptionData.custom_id);
      }
    }

    const donorEmail = subscriptionData.subscriber.email_address;
    const firstName = subscriptionData.subscriber.name?.given_name || '';
    const lastName = subscriptionData.subscriber.name?.surname || '';
    const phone = subscriptionData.subscriber?.phone?.phone_number?.national_number || 'N/A';
    const state = subscriptionData.subscriber?.shipping_address?.admin_area_1 || 'N/A';
    const country = subscriptionData.subscriber?.shipping_address?.country_code || 'N/A';


    // Step 5: Record the donation details in your database (omitted for brevity)
    const donationData = {
      amount: donationAmount,
      paymentMethod: 'PayPal Subscription',
      transactionId: subscriptionData.id,
      firstName,
      lastName,
      email: donorEmail,
      phone,
      state,
      country,
      giftType: 'monthly',
      ref_code,
    };

    // Here you’d store donationData (e.g., insert into your database)
    const donation = await db.Donations.create(donationData);


 // Affiliate logic
     // ✅ Affiliate logic
 if (ref_code) {
  const affiliate = await db.Profile.findOne({
    where: { affiliate_code: ref_code }
  });

  if (affiliate) {
    const commissionRate = 0.15;
    const commission = donation.amount * commissionRate;

    await db.Referral.create({
      affiliate_id: affiliate.id,
      transaction_id: donation.transactionId || `DON-${Date.now()}`,
      amount: donation.amount,
      commission,
      status: 'pending',
    });
  }
}

    // Step 6: Return a successful response.
    res.status(200).json({
      message: 'Subscription confirmed and donation recorded.',
      donation: donationData, // optionally return the record for verification
    });
  } catch (error) {
    console.error("Error confirming subscription:", error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to confirm subscription.' });
  }
});

export default paypalRouter;
