import db from '../models/index.js';
import {
  sendApplicationConfirmation,
  sendInterviewInvitation,
  sendAdmissionDecision,
  sendStatusUpdateNotification,
} from '../utils/admissionEmailService.js';

// Creating the New Admission controller
export const NewAdmission = async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      address,
      countyOfResidence,
      phone,
      email,
      gender,
      identificationType,
      identificationNumber,
      age,
      nationality,
      emergencyContactName,
      emergencyPersonAddress,
      emergencyContactNumber,
      relationshipType,
      desiredProgram,
      educationLevel,
      lastSchoolAttended,
      fieldOfStudy,
      yearOfGraduation,
      personalStatement,
      communityImpact,
      haveComputer,
      consented,
    } = req.body;

    // File uploads (if using multer for handling files)
    const applicantImage = req.files?.applicantImage?.[0]?.filename || null;
    const churchRecommendationLetter = req.files?.churchRecommendationLetter?.[0]?.filename || null;
    const communityRecommendationLetter = req.files?.communityRecommendationLetter?.[0]?.filename || null;

    // Validate required fields
    if (!fullName || !email || !phone || !desiredProgram || !consented) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields.',
      });
    }

    // Create the new admission record
    const newAdmission = await db.Admission.create({
      fullName,
      dateOfBirth,
      address,
      countyOfResidence,
      phone,
      email,
      gender,
      identificationType,
      identificationNumber,
      age,
      nationality,
      emergencyContactName,
      emergencyPersonAddress,
      emergencyContactNumber,
      relationshipType,
      desiredProgram,
      educationLevel,
      lastSchoolAttended,
      fieldOfStudy,
      yearOfGraduation,
      personalStatement,
      communityImpact,
      applicantImage,
      haveComputer,
      consented,
      churchRecommendationLetter,
      communityRecommendationLetter,
      status: 'pending',
      notificationHistory: [{
        status: 'pending',
        date: new Date(),
        message: 'Application submitted successfully'
      }]
    });

    // Send confirmation emails
    try {
      await sendApplicationConfirmation(newAdmission);
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Continue processing even if email fails
    }

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully. Please check your email for confirmation.',
      data: {
        applicationNumber: newAdmission.applicationNumber,
        status: newAdmission.status
      }
    });
  } catch (error) {
    console.error('Error creating new admission:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while submitting your application.',
      error: error.message,
    });
  }
};

// Get application status
export const getApplicationStatus = async (req, res) => {
  try {
    const { applicationNumber } = req.params;
    const admission = await db.Admission.findOne({
      where: { applicationNumber },
      attributes: ['applicationNumber', 'status', 'fullName', 'desiredProgram', 'interviewDate', 'interviewLocation', 'createdAt']
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
    const { applicationNumber } = req.params;
    const { status, interviewDate, interviewLocation, notes } = req.body;

    const admission = await db.Admission.findOne({
      where: { applicationNumber }
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
