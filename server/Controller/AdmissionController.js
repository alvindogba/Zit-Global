import db from '../models/index.js';
import {
  sendApplicationConfirmation,
  sendInterviewInvitation,
  sendAdmissionDecision,
  sendStatusUpdateNotification,
} from '../utils/admissionEmailService.js';
import bcrypt from 'bcryptjs';

const saltRounds = 12;
// Creating the New Admission controller
export const NewAdmission = async (req, res) => {
    // Handle file paths
    const files = req.files;
    const filePaths = {
      applicantImage: files.applicantImage?.[0]?.path,
      churchRecommendationLetter: files.churchRecommendationLetter?.[0]?.path,
      communityRecommendationLetter: files.communityRecommendationLetter?.[0]?.path
    };

    try {
      // Creating the password hash for the user
      const password = 'zit_student'; // Replace with actual password
      const hash= await bcrypt.hash(password, saltRounds);
      const fullName = req.body.firstName + ' ' + req.body.lastName;
     // Create a new user
      const newUser = await db.User.create({
        full_name: fullName,
        email: req.body.email,
        phone_number: req.body.phone,
        password_hash: hash, 
        role: 'student', 
        is_active: false,
      });
      // Create application record
      const application = {
        ...req.body,
        user_id: newUser.id,
        ...filePaths,
        consented: req.body.consented
      };

      console.log("application", application)

      // Save application record
      const newAdmission = await db.Admission.create(application);

      // // Send confirmation email
      await sendApplicationConfirmation(newAdmission);

      return res.status(200).json({
        success: true,
        message: 'Application created successfully',
        data: newAdmission
      });
     } catch (error) {
    console.error('Error creating new admission:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating new admission'
    });
  }
};


// Get application status
export const getApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const admission = await db.Admission.findOne({
      where: { id },
      attributes: ['applicationNumber', 'status', 'firstName', 'lastName', 'email', 'desiredProgram', 'applicantImage', 'createdAt']
    });

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: admission
    });
  } catch (error) {
    console.error('Error fetching application status:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving application status'
    });
  }
};

// Update application status (admin only)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, interviewDate, interviewLocation, notes } = req.body;

    const admission = await db.Admission.findOne({
      where: { id }
    });

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    const previousStatus = admission.status;
    const updateData = {
      status,
      notes: notes ? `${admission.notes ? admission.notes + '\n' : ''}${new Date().toISOString()}: ${notes}` : admission.notes
    };

    if (status === 'interview_scheduled') {
      if (!interviewDate || !interviewLocation) {
        return res.status(400).json({
          success: false,
          message: 'Interview date and location are required for interview scheduling'
        });
      }
      updateData.interviewDate = interviewDate;
      updateData.interviewLocation = interviewLocation;
    }

    if (status === 'accepted' || status === 'rejected') {
      updateData.admissionDecisionDate = new Date();
    }

    // Update notification history
    const notificationHistory = [...admission.notificationHistory];
    notificationHistory.push({
      status,
      date: new Date(),
      message: notes || `Status updated to ${status}`
    });
    updateData.notificationHistory = notificationHistory;
    updateData.lastNotificationSent = new Date();

    await admission.update(updateData);

    // Send appropriate email notifications
    try {
      if (status === 'interview_scheduled') {
        await sendInterviewInvitation(admission);
      } else if (status === 'accepted' || status === 'rejected') {
        await sendAdmissionDecision(admission);
      } else {
        await sendStatusUpdateNotification(admission, previousStatus);
      }
    } catch (emailError) {
      console.error('Error sending notification email:', emailError);
    }

    return res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      data: {
        applicationNumber: admission.applicationNumber,
        status: admission.status,
        interviewDate: admission.interviewDate,
        interviewLocation: admission.interviewLocation
      }
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating application status'
    });
  }
};
