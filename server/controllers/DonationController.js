import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';
import { Donation } from '../models/Donation.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const DOMAIN = process.env.DOMAIN 

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});




// Handle Stripe webhook
export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      // Update donation status if needed
      await Donation.findOneAndUpdate(
        { transactionId: paymentIntent.id },
        { status: 'completed' }
      );
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: 'Webhook error' });
  }
};

// Handle PayPal webhook
export const handlePayPalWebhook = async (req, res) => {
  try {
    const { event_type, resource } = req.body;

    if (event_type === 'PAYMENT.CAPTURE.COMPLETED') {
      // Update donation status if needed
      await Donation.findOneAndUpdate(
        { transactionId: resource.id },
        { status: 'completed' }
      );
    }

    res.json({ received: true });
  } catch (error) {
    console.error('PayPal webhook error:', error);
    res.status(400).json({ error: 'Webhook error' });
  }
};

// Get donation details
export const getDonationDetails = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const donation = await Donation.findOne({
      where: { transactionId },
      attributes: [
        'amount',
        'firstName',
        'lastName',
        'email',
        'transactionId',
        'createdAt'
      ]
    });

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    res.json(donation);
  } catch (error) {
    console.error('Error fetching donation details:', error);
    res.status(500).json({ error: 'Failed to fetch donation details' });
  }
};

// Helper function to generate PDF receipt
const generateReceipt = async (donation) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      // Add content to PDF
      doc.fontSize(20).text('Donation Receipt', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`);
      doc.text(`Receipt No: ${donation._id}`);
      doc.moveDown();
      doc.text(`Donor: ${donation.firstName} ${donation.lastName}`);
      doc.text(`Amount: $${donation.amount.toFixed(2)}`);
      doc.text(`Payment Method: ${donation.paymentMethod}`);
      doc.text(`Transaction ID: ${donation.transactionId}`);
      doc.moveDown();
      doc.text('Thank you for your generous donation!');

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

// Helper function to send confirmation email
const sendConfirmationEmail = async (donation, receiptBuffer) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: donation.email,
    subject: 'Thank You for Your Donation',
    html: `
      <h1>Thank You for Your Donation!</h1>
      <p>Dear ${donation.firstName},</p>
      <p>Thank you for your generous donation of $${donation.amount.toFixed(2)}.</p>
      <p>Your support helps us make a difference in the lives of young people.</p>
      <p>Transaction Details:</p>
      <ul>
        <li>Amount: $${donation.amount.toFixed(2)}</li>
        <li>Date: ${new Date().toLocaleDateString()}</li>
        <li>Transaction ID: ${donation.transactionId}</li>
      </ul>
      <p>Your receipt is attached to this email.</p>
      <p>Best regards,<br>Big Brothers Big Sisters of America</p>
    `,
    attachments: [
      {
        filename: 'donation-receipt.pdf',
        content: receiptBuffer,
        contentType: 'application/pdf',
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};
