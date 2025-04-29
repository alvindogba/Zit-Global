import { sendContactConfirmation, sendAdminNotification } from '../utils/emailService.js';
import db from "../models/index.js"

export const submitContactForm = async (req, res) => {
  console.log(req.body)
  try {
    const { fullName, email, message } = req.body;

    // Validate required fields
    if (!fullName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields.',
      });
    }

    // Create contact entry in database
    const contact = await db.Contact.create({
      fullName,
      email,
      message,
    });

    // Send confirmation email to user
    await sendContactConfirmation(email, fullName);

    // Send notification to admin
    await sendAdminNotification({
      fullName,
      email,
      message,
    });

    return res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will contact you soon.',
      data: contact,
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while submitting your message.',
      error: error.message,
    });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching contacts.',
      error: error.message,
    });
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found.',
      });
    }

    contact.status = status;
    await contact.save();

    return res.status(200).json({
      success: true,
      message: 'Contact status updated successfully.',
      data: contact,
    });
  } catch (error) {
    console.error('Error updating contact status:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while updating contact status.',
      error: error.message,
    });
  }
};
