import {sendMenteeConfirmation, sendMentorConfirmation } from '../utils/IccEmailService.js';
import { sendAdminNotification } from '../utils/IccEmailService.js';
import db from "../models/index.js";
import bcrypt from 'bcryptjs';

const saltRounds = 12;

//the mentor controller
export const mentorController = async (req, res) => {
  console.log(req.body);
  try {
    const {
      fullName,
      email,
      phone,
      profession,
      mentorshipAreas,
      priorExperience,
      experienceDetails,
      mentorshipFormat,
      availability,
      motivation,
      referral,

    } = req.body;

    // Validate required fields
    if (
      !fullName ||
      !email ||
      !phone ||
      ! profession ||
      !  mentorshipAreas ||
      ! priorExperience ||
      ! experienceDetails ||
      ! mentorshipFormat ||
      !availability
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields.',
      });
    }
        // checking if the mentee already exists
        const existingMentee = await db.Mentee.findOne({ where: { email } });
    
        if (existingMentee) {
          return res.status(409).json({ error: 'Email already exists. You have already applied.' });   
        }
      // creating the password hash for the user
      const password = 'zit_mentor'; // Replace with actual password
      const hash= await bcrypt.hash(password, saltRounds);
      // Create a new user
      const newUser = await db.User.create({
        full_name: fullName,
        email,
        phone_number: phone,
        password_hash: hash, 
        role: 'mentor',
        is_active: false,
      });

    // Create School Admin entry in the database
    const newMentor = await db.Mentor.create({
      fullName,
      user_id: newUser.id, // Assuming you have a user_id field in your SchoolAdmin model
      email,
      phone,
      profession,
      mentorshipAreas,
      priorExperience,
      experienceDetails,
      mentorshipFormat,
      availability,
      motivation,
      referral,
    });

    // Send confirmation email to user
    await sendMentorConfirmation(email, fullName);

    // Send notification email to admin
    await sendAdminNotification(
      'Mentor',
      {
      fullName,
      email,
      phone,
    
    });

    return res.status(201).json({
      success: true,
      message: 'Your submission has been received. A confirmation email has been sent.',
      data: newMentor,
    });
  } catch (error) {
    console.error('Error creating school admin entry:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your submission.',
      error: error.message,
    });
  }
};

//the mentee controller
export const menteeController = async (req, res) => {
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

        // checking if the mentee already exists
        const existingMentee = await db.Mentee.findOne({ where: { email } });
    
        if (existingMentee) {
          return res.status(409).json({ error: 'Email already exists. You have already applied.' });   
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