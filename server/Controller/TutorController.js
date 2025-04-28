import {sendTutorConfirmation, sendStudentConfirmation, sendParentConfirmation, sendMentorConfirmation, sendSchoolAdminConfirmation, sendTeacherConfirmation  } from '../utils/IccEmailService.js';
import { sendAdminNotification } from '../utils/IccEmailService.js';
import db from "../models/index.js";
import bcrypt from 'bcryptjs';

const saltRounds = 12;

export const createSchoolAdmin = async (req, res) => {
  console.log(req.body);
  try {
    const {
      fullName,
      email,
      phone,
      schoolName,
      schoolLocation,
      services,
      gradeLevels,
      supportMode,
      challenges,
      contactMethod,
      bestTime,
      additionalComments,
      referral
    } = req.body;

    // Validate required fields
    if (
      !fullName ||
      !email ||
      !phone ||
      !schoolName ||
      !schoolLocation ||
      !gradeLevels ||
      !supportMode ||
      !contactMethod ||
      !bestTime
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields.',
      });
    }
      // creating the password hash for the user
      const password = 'zit_schoolAdmin'; // Replace with actual password
      const hash= await bcrypt.hash(password, saltRounds);
      // Create a new user
      const newUser = await db.User.create({
        full_name: fullName,
        email,
        phone_number: phone,
        password_hash: hash, 
        role: 'administrator',
        is_active: false,
      });

    // Create School Admin entry in the database
    const schoolAdmin = await db.SchoolAdmin.create({
      fullName,
      user_id: newUser.id, // Assuming you have a user_id field in your SchoolAdmin model
      email,
      phone,
      schoolName,
      schoolLocation,
      services,
      gradeLevels,
      supportMode,
      challenges,
      contactMethod,
      bestTime,
      additionalComments,
      referral,
    });

    // Send confirmation email to user
    await sendSchoolAdminConfirmation(email, fullName);

    // Send notification email to admin
    await sendAdminNotification(
      'School Admin',
      {
      fullName,
      email,
      phone,
      schoolName,
      schoolLocation,
    });

    return res.status(201).json({
      success: true,
      message: 'Your submission has been received. A confirmation email has been sent.',
      data: schoolAdmin,
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

export const createTeacher = async (req, res) => {
  
  console.log(req.body);
  try {
    const {
      fullName,
      dob,
      email,
      phone,
      gender,
      educationLevel,
      teachingExperience,
      subjects,
      teachingStyle,
      teachingPhilosophy,
      objectives,
      availability,
      preferredLevel,
      referral
    } = req.body;

    // Validate required fields
    if (
      !fullName ||
      !dob ||
      !email ||
      !phone ||
      !gender ||
      !educationLevel ||
      !teachingExperience ||
      !subjects ||
      !teachingStyle ||
      !teachingPhilosophy ||
      !objectives ||
      !availability ||
      !preferredLevel
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields.',
      });
    }

          // creating the password hash for the user
          const password = 'zit_teacher'; // Replace with actual password
          const hash= await bcrypt.hash(password, saltRounds);
          // Create a new user
          const newUser = await db.User.create({
            full_name: fullName,
            email,
            phone_number: phone,
            password_hash: hash, 
            role: 'teacher',
            is_active: false,
          });
    

//     // Create Teacher entry in the database
    const teacher = await db.Teacher.create({
      fullName,
      user_id: newUser.id,
      dob,
      email,
      phone,
      gender,
      educationLevel,
      teachingExperience,
      subjects,
      teachingStyle,
      teachingPhilosophy,
      objectives,
      availability,
      preferredLevel,
      referral
    });

//     // Send confirmation email to user
    await sendTeacherConfirmation(email, fullName);

    //     // Send notification email to admin
    await sendAdminNotification(
      'Teacher',
      { fullName: newTutees.fullName,
        email:    newTutees.email,
        phone:    newTutees.phone,
        
      }                                   // ← submissionData
    );

    return res.status(201).json({
      success: true,
      message: 'Your submission has been received. A confirmation email has been sent.',
      data: schoolAdmin,
    });
  } catch (error) {
    console.error('Error creating teacher entry:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your submission.',
      error: error.message,
    });
  }
};




  // Controller for creating a Parent entry ==============
export const createParent = async (req, res) => {
    console.log(req.body);
    try {
      const {
        fullName,
        email,
        phone,
        relationToStudent,
        studentName,
        studentAge,
        schoolName,
        gradeLevel,
        subjects,
        tutoringStyle,
        learningGoals,
        availability,
        comments,
        referral,
      } = req.body;
  
      // Validate required fields
      if (
        !fullName ||
        !email ||
        !phone ||
        !relationToStudent ||
        !studentName ||
        !studentAge ||
        !schoolName ||
        !gradeLevel ||
        !tutoringStyle ||
        !availability
      ) {
        return res.status(400).json({
          success: false,
          message: 'Please provide all required fields for parent registration.',
        });
      }

            // creating the password hash for the user
            const password = 'zit_parent'; // Replace with actual password
            const hash= await bcrypt.hash(password, saltRounds);
            // Create a new user
            const newUser = await db.User.create({
              full_name: fullName,
              email,
              phone_number: phone,
              password_hash: hash, 
              role: 'parent',
              is_active: false,
            });
      
  
      // Create Parent entry in the database
      const parent = await db.Parent.create({
        fullName,
        user_id: newUser.id, // Assuming you have a user_id field in your Parent model
        email,
        phone,
        relationToStudent,
        studentName,
        studentAge,
        schoolName,
        gradeLevel,
        subjects,
        tutoringStyle,
        learningGoals,
        availability,
        comments,
        referral,
      });
  
      // Send confirmation email to user
      await sendParentConfirmation(email, fullName);
  
      // Send notification email to admin
      await sendAdminNotification(
        'Parent',                            // ← submissionType
        {
        fullName,
        email,
        phone,
        schoolName,
        gradeLevel,
      });
  
      return res.status(201).json({
        success: true,
        message: 'Parent registration submitted successfully. A confirmation email has been sent.',
        data: parent,
      });
    } catch (error) {
      console.error('Error creating parent entry:', error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing your parent registration.',
        error: error.message,
      });
    }
  };

  // controller for creating Tutees entry ==================
  export const createTutees = async (req, res) => {
    console.log("Tutees Data",  req.body);
    try {
      const {
        fullName,
        dob,
        email,
        phone,
        gender,
        schoolName,
        gradeLevel,
        subjects,
        learningStyle,
        tutoringNeeds,
        objectives,
        availability,
        tutorType,
        referral,
      } = req.body;
  
      // Validate required fields
      if (
        !fullName ||
        !dob ||
        !email ||
        !phone ||
        !gender ||
        !schoolName ||
        !gradeLevel ||
        !learningStyle ||
        !tutoringNeeds ||
        !availability ||
        !tutorType
      ) {
        return res.status(400).json({
          success: false,
          message: 'Please provide all required fields for student registration.',
        });
      }
   
      // creating the password hash for the user
      const password = 'zit_tutees'; // Replace with actual password
      const hash= await bcrypt.hash(password, saltRounds);
      // Create a new user
      const newUser = await db.User.create({
        full_name: fullName,
        email,
        phone_number: phone,
        password_hash: hash, 
        role: 'tutee',
        is_active: false,
      });

      // Create Tutees entry in the database
      const newTutees = await db.Tutees.create({
        user_id: newUser.id, // Assuming you have a user_id field in your Tutees model
        fullName,
        dob,
        email,
        phone,
        gender,
        schoolName,
        gradeLevel,
        subjects,
        learningStyle,
        tutoringNeeds,
        objectives,
        availability,
        tutorType,
        referral,
      });
  
    
      // Send confirmation email to user
      await sendStudentConfirmation(newTutees.email, newTutees.fullName);
  
      await sendAdminNotification(
        'Tutee',                            // ← submissionType
        {
          fullName: newTutees.fullName,
          email:    newTutees.email,
          phone:    newTutees.phone,
          schoolName: newTutees.schoolName,
          gradeLevel: newTutees.gradeLevel
        }                                   // ← submissionData
      );
      
      return res.status(200).json({
        success: true,
        message: 'Student registration submitted successfully. A confirmation email has been sent.',
        data: newTutees,
      });
    } catch (error) {
      console.error('Error creating student entry:', error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing your student registration.',
        error: error.message,
      });
    }
  };


  // Controller for creating a Mentor entry
export const createTutor = async (req, res) => {
    console.log(req.body);
    try {
      const {
        fullName,
        email,
        phone,
        currentRole,
        subjects,
        priorTeachingExperience,
        experienceDetails,
        tutoringFormat,
        availability,
        educationalBackground,
        referral,
      } = req.body;
  
      // Validate required fields
      if (
        !fullName ||
        !email ||
        !phone ||
        !availability
      ) {
        return res.status(400).json({
          success: false,
          message: 'Please provide all required fields for mentor registration.',
        });
      }

      // Creating the password hash for the user
      const password = 'zit_tutor'; // Replace with actual password
      const hash= await bcrypt.hash(password, saltRounds);

     // Create a new user
      const newUser = await db.User.create({
        full_name: fullName,
        email,
        phone_number: phone,
        password_hash: hash, 
        role: 'tutor', 
        is_active: false,
      });
      // Create Tutor entry in the database
      const newTutor = await db.Tutor.create({
        user_id: newUser.id, // Assuming you have a user_id field in your Tutees model
        fullName,
        email,
        phone,
        currentRole,
        subjects,
        priorTeachingExperience,
        experienceDetails,
        tutoringFormat,
        availability,
        educationalBackground,
        referral,
      });
  
      // Send confirmation email to user
      await sendTutorConfirmation(newTutor.email, newTutor.fullName);
  
      // Send notification email to admin
      await sendAdminNotification(
        'Tutor',                            // ← submissionType
        {
          fullName: newTutor.fullName,
          email:    newTutor.email,
          phone:    newTutor.phone,
          currentRole: newTutor.currentRole,
          subjects: newTutor.subjects
        }                                   // ← submissionData
      );

  

      return res.status(201).json({
        success: true,
        message: 'Tutor registration submitted successfully. A confirmation email has been sent.',
        data: newTutor,
      });
    } catch (error) {
      console.error('Error creating mentor entry:', error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing your mentor registration.',
        error: error.message,
      });
    }
  };
  

