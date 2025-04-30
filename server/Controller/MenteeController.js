import { sendMenteeConfirmation  } from '../utils/IccEmailService.js';
import { sendAdminNotification } from '../utils/IccEmailService.js';
import db from "../models/index.js";
import bcrypt from 'bcryptjs';

const saltRounds = 12;

export const mentorController = async (req, res) => {
  console.log(req.body);
  try {
    const {
      fullName,
      dob,
      email,
      phone,
      gender,
      occupation,
      mentorshipAreas,
      goals,
      challenges,
      availability,
      mentorType,
      referral,

    } = req.body;

    // Validate required fields
    if (
      !fullName ||
      !dob ||
      !email ||
      !phone ||
      !gender ||
      !occupation ||
      !mentorshipAreas ||
      !goals ||
      !challenges ||
      !availability ||
      !mentorType
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields.',
      });
    }
      // creating the password hash for the user
      const password = 'zit_mentee'; // Replace with actual password
      const hash= await bcrypt.hash(password, saltRounds);
      // Create a new user
      const newUser = await db.User.create({
        full_name: fullName,
        email,
        phone_number: phone,
        password_hash: hash, 
        role: 'mentee',
        is_active: false,
      });

    // Create Mentee entry in the database
    const newMentee = await db.Mentee.create({
      fullName,
      user_id: newUser.id, // Assuming you have a user_id field in your Mentee model
      email,
      phone,
      gender,
      dob,
      occupation,
      mentorshipAreas,
      goals,
      challenges,
      availability,
      mentorType,
      referral,
    });

    // Send confirmation email to user
    await sendMenteeConfirmation(email, fullName);

    // Send notification email to admin
    await sendAdminNotification(
      'Mentee',
      {
      fullName,
      email,
      phone,
    
    });

    return res.status(201).json({
      success: true,
      message: 'Your submission has been received. A confirmation email has been sent.',
      data: newMentee,
    });
  } catch (error) {
    console.error('Error creating mentee entry:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your submission.',
      error: error.message,
    });
  }
};