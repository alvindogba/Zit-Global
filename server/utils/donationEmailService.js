import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const sendDonationReceipt = async (donation) => {
  const emailTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2>Thank You for Your Donation!</h2>
      <p>Dear ${donation.firstName} ${donation.lastName},</p>
      <p>Thank you for your generous donation to the Zongea Institute Of Technology. Your support helps us continue our mission of providing free education and mentorship.</p>
      
      <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
        <h3>Donation Details:</h3>
        <p>Receipt Number: ${donation.receiptNumber}</p>
        <p>Amount: ${formatCurrency(donation.amount, donation.currency)}</p>
        <p>Date: ${new Date(donation.createdAt).toLocaleDateString()}</p>
        <p>Payment Method: ${donation.paymentMethod}</p>
        <p>Donation Type: ${donation.donationType}</p>
      </div>
      
      <div style="margin-top: 30px;">
        <p>Best regards,</p>
        <p>The ZIT Team</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: donation.email,
    subject: 'Thank You for Your Donation to ZIT',
    html: emailTemplate,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending donation receipt:', error);
    throw error;
  }
};

export const sendDonationNotificationToAdmin = async (donation) => {
  const emailTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2>New Donation Received</h2>
      
      <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
        <h3>Donation Details:</h3>
        <p>Receipt Number: ${donation.receiptNumber}</p>
        <p>Amount: ${formatCurrency(donation.amount, donation.currency)}</p>
        <p>Date: ${new Date(donation.createdAt).toLocaleDateString()}</p>
        <p>Payment Method: ${donation.paymentMethod}</p>
        <p>Donation Type: ${donation.donationType}</p>
        
        <h3>Donor Information:</h3>
        <p>Name: ${donation.firstName} ${donation.lastName}</p>
        <p>Email: ${donation.email}</p>
        <p>Phone: ${donation.phoneNumber}</p>
        <p>Location: ${donation.selectedLocation}, ${donation.selectedCountry}</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Donation Received - ${donation.receiptNumber}`,
    html: emailTemplate,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending admin notification:', error);
    throw error;
  }
};