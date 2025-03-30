import {sendStudentConfirmation, sendParentConfirmation, sendMentorConfirmation, sendSchoolAdminConfirmation, sendTeacherConfirmation  } from '../utils/IccEmailService.js';
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

    // Create Teacher entry in the database
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

    // Send confirmation email to user
    await sendTeacherConfirmation(email, fullName);

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


// The Students=======================
export const createStudent = async (req, res) => {
    console.log(req.body);
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
  
      // Create Student entry in the database
      const student = await db.Student.create({
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
      // await sendStudentConfirmation(email, fullName);
  
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
        message: 'Student registration submitted successfully. A confirmation email has been sent.',
        data: student,
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


  // Controller for creating a Mentor entry
export const createMentor = async (req, res) => {
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
        !profession ||
        !mentorshipAreas ||
        !priorExperience ||
        !mentorshipFormat ||
        !availability
      ) {
        return res.status(400).json({
          success: false,
          message: 'Please provide all required fields for mentor registration.',
        });
      }
  
      // Create Mentor entry in the database
      const mentor = await db.Mentor.create({
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
      });
  
      // Send confirmation email to user
      // await sendMentorConfirmation(email, fullName);
  
      // Send notification email to admin
    //   await sendAdminNotification({
    //     fullName,
    //     email,
    //     phone,
    //     profession,
    //   });
  
      return res.status(201).json({
        success: true,
        message: 'Mentor registration submitted successfully. A confirmation email has been sent.',
        data: mentor,
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
  

