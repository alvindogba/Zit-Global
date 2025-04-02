import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import db from "../models/index.js";
import { sendDonationReceipt } from '../utils/donationEmailService.js';

dotenv.config();

const paypalRouter = express.Router();

paypalRouter.post("/save-donation", async (req, res) => {
  console.log(req.body);
  try {
    const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_CLIENT_SECRET;
    const PAYPAL_API = process.env.PAYPAL_API; // Ensure this is set in .env

    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64");
    // ✅ Extract transactionId from request body
    const { transactionId } = req.body;
    // Step 1: Get PayPal Access Token
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

    const accessToken = tokenResponse.data.access_token;
    console.log("PayPal Access Token:", accessToken);

    // Step 2: Verify PayPal Transaction
    const paypalResponse = await axios.get(
      `${PAYPAL_API}/v2/checkout/orders/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("PayPal Response:", paypalResponse.data);

    if (paypalResponse.data.status !== "COMPLETED") {
      return res.status(400).json({ message: "Payment not verified" });
    }

    // Step 3: Save donation details to DB
    const donation = await db.Donations.create({
      ...req.body,
      status: "completed",
    });

    // Generate receipt
    const generateReceipt = () => {
      const year = new Date().getFullYear();
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      return `DON-${year}-${random}`;
    };

    const receiptNumber = generateReceipt();

    // Send confirmation email
    console.log("Donation Data:", donation, "Receipt Number:", receiptNumber);
    await sendDonationReceipt(donation, receiptNumber);

    res.json({ success: true, donationId: donation._id });

  } catch (error) {
    console.error("Error processing donation:", error.response?.data || error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default paypalRouter;
