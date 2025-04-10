import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import db from "../models/index.js";
import { sendDonationReceipt } from '../utils/donationEmailService.js';

dotenv.config();

const paypalRouter = express.Router();

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
      type: "one-time"
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
paypalRouter.post("/save-subscription", async (req, res) => {
  console.log("Processing subscription:", req.body);
  try {
    const PAYPAL_API = process.env.PAYPAL_API;
    const { subscriptionId, donorInfo, amount } = req.body;

    // Get access token
    const accessToken = await getPayPalAccessToken();

    // Verify subscription
    const subscriptionResponse = await axios.get(
      `${PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("PayPal subscription response:", subscriptionResponse.data);

    if (subscriptionResponse.data.status !== "ACTIVE") {
      return res.status(400).json({ message: "Subscription not active" });
    }

    // Save subscription to DB
    const subscription = await db.Donations.create({
      ...donorInfo,
      amount,
      paymentMethod: "paypal",
      transactionId: subscriptionId,
      status: "active",
      type: "subscription",
      subscriptionDetails: {
        frequency: "monthly",
        startDate: new Date(),
        paypalSubscriptionId: subscriptionId
      }
    });

    // Send confirmation email
    const receiptNumber = generateReceipt();
    await sendDonationReceipt(subscription, receiptNumber);

    res.json({ 
      success: true, 
      subscriptionId: subscription._id,
      message: "Subscription activated successfully"
    });

  } catch (error) {
    console.error("Error processing subscription:", error.response?.data || error.message);
    res.status(500).json({ message: "Error processing subscription" });
  }
});

export default paypalRouter;
