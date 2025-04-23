import {sendStudentConfirmation, sendParentConfirmation, sendMentorConfirmation, sendSchoolAdminConfirmation, sendTeacherConfirmation  } from '../utils/IccEmailService.js';
import { sendAdminNotification } from '../utils/IccEmailService.js';
import db from "../models/index.js";

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

    // Create School Admin entry in the database
    const schoolAdmin = await db.SchoolAdmin.create({
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
      referral,
    });

    // Send confirmation email to user
    // await sendSchoolAdminConfirmation(email, fullName);

    // Send notification email to admin
    // await sendAdminNotification({
    //   fullName,
    //   email,
    //   phone,
    //   schoolName,
    //   schoolLocation,
    // });

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

//     // Create Teacher entry in the database
    const teacher = await db.Teacher.create({
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
    });

//     // Send confirmation email to user
//     await sendTeacherConfirmation(email, fullName);

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
  
      // Create Parent entry in the database
      const parent = await db.Parent.create({
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
      });
  
      // Send confirmation email to user
      // await sendParentConfirmation(email, fullName);
  
      // Send notification email to admin
    //   await sendAdminNotification({
    //     fullName,
    //     email,
    //     phone,
    //     schoolName,
    //     gradeLevel,
    //   });
  
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
  
      // Create a new user
      const newUser = await db.User.create({
        full_name: fullName,
        email,
        phone_number: phone,
        password_hash: 'zit_tutees', // Replace with actual hashed password
        role: 'tutee', // Assuming 'tutee' is a valid role in your system
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

     // Create a new user
      const newUser = await db.User.create({
        full_name: fullName,
        email,
        phone_number: phone,
        password_hash: 'zit_tutor', // Replace with actual hashed password
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
      await sendMentorConfirmation(newTutor.email, newTutor.fullName);
  
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
  

