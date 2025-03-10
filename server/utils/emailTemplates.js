const templates = {
  application_confirmation: (data) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2c3e50; text-align: center;">Application Received</h1>
      <p>Dear ${data.fullName},</p>
      <p>Thank you for applying to Zion Institute of Technology. We have received your application for the ${data.program} program.</p>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Application Details:</strong></p>
        <ul style="list-style: none; padding: 0;">
          <li>Application Number: ${data.applicationNumber}</li>
          <li>Submission Date: ${data.applicationDate}</li>
          <li>Program: ${data.program}</li>
        </ul>
      </div>
      <p>What happens next?</p>
      <ol>
        <li>Our admissions team will review your application</li>
        <li>You will receive updates about your application status</li>
        <li>If selected, you will receive an invitation for an interview</li>
      </ol>
      <p>You can track your application status using your application number: ${data.applicationNumber}</p>
      <p>If you have any questions, please don't hesitate to contact us.</p>
      <div style="text-align: center; margin-top: 30px; color: #7f8c8d;">
        <p>Zion Institute of Technology</p>
        <p>Transforming Lives Through Technology Education</p>
      </div>
    </div>
  `,

  admin_application_notification: (data) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2c3e50;">New Application Received</h2>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
        <p><strong>Application Details:</strong></p>
        <ul style="list-style: none; padding: 0;">
          <li>Application Number: ${data.applicationNumber}</li>
          <li>Applicant Name: ${data.fullName}</li>
          <li>Program: ${data.program}</li>
          <li>Email: ${data.email}</li>
          <li>Phone: ${data.phone}</li>
        </ul>
      </div>
      <p>Please review this application in the admin dashboard.</p>
    </div>
  `,

  interview_invitation: (data) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2c3e50; text-align: center;">Interview Invitation</h1>
      <p>Dear ${data.fullName},</p>
      <p>We are pleased to invite you for an interview for the ${data.program} program at Zion Institute of Technology.</p>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Interview Details:</strong></p>
        <ul style="list-style: none; padding: 0;">
          <li>Date and Time: ${data.interviewDate}</li>
          <li>Location: ${data.interviewLocation}</li>
          <li>Application Number: ${data.applicationNumber}</li>
        </ul>
      </div>
      <p><strong>Please bring:</strong></p>
      <ul>
        <li>A valid photo ID</li>
        <li>Original copies of your certificates</li>
        <li>Any additional documents mentioned in your application</li>
      </ul>
      <p>If you need to reschedule, please contact us at least 48 hours before your scheduled interview.</p>
      <div style="text-align: center; margin-top: 30px; color: #7f8c8d;">
        <p>Zion Institute of Technology</p>
        <p>Transforming Lives Through Technology Education</p>
      </div>
    </div>
  `,

  acceptance_letter: (data) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2c3e50; text-align: center;">Congratulations!</h1>
      <p>Dear ${data.fullName},</p>
      <p>We are delighted to inform you that you have been accepted to the ${data.program} program at Zion Institute of Technology!</p>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Program Details:</strong></p>
        <ul style="list-style: none; padding: 0;">
          <li>Program: ${data.program}</li>
          <li>Start Date: ${data.startDate}</li>
          <li>Application Number: ${data.applicationNumber}</li>
        </ul>
      </div>
      <p>Next steps:</p>
      <ol>
        <li>Complete your enrollment form</li>
        <li>Pay your enrollment deposit</li>
        <li>Attend the orientation session</li>
      </ol>
      <p>We will send you additional information about these steps shortly.</p>
      <p>Welcome to the ZIT family!</p>
      <div style="text-align: center; margin-top: 30px; color: #7f8c8d;">
        <p>Zion Institute of Technology</p>
        <p>Transforming Lives Through Technology Education</p>
      </div>
    </div>
  `,

  rejection_letter: (data) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2c3e50; text-align: center;">Application Decision</h1>
      <p>Dear ${data.fullName},</p>
      <p>Thank you for your interest in the ${data.program} program at Zion Institute of Technology.</p>
      <p>After careful consideration of your application, we regret to inform you that we are unable to offer you admission at this time.</p>
      <p>This decision does not reflect on your abilities or potential. We encourage you to:</p>
      <ul>
        <li>Consider applying for our other programs</li>
        <li>Reapply in the next admission cycle</li>
        <li>Schedule a consultation with our admissions team for feedback</li>
      </ul>
      <p>We wish you the best in your future endeavors.</p>
      <div style="text-align: center; margin-top: 30px; color: #7f8c8d;">
        <p>Zion Institute of Technology</p>
        <p>Transforming Lives Through Technology Education</p>
      </div>
    </div>
  `,

  status_update: (data) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2c3e50; text-align: center;">Application Status Update</h1>
      <p>Dear ${data.fullName},</p>
      <p>There has been an update to your application for the ${data.program} program.</p>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Status Update:</strong></p>
        <ul style="list-style: none; padding: 0;">
          <li>Application Number: ${data.applicationNumber}</li>
          <li>Previous Status: ${data.previousStatus}</li>
          <li>Current Status: ${data.currentStatus}</li>
        </ul>
      </div>
      <p>We will continue to keep you updated on any changes to your application.</p>
      <p>If you have any questions, please don't hesitate to contact us.</p>
      <div style="text-align: center; margin-top: 30px; color: #7f8c8d;">
        <p>Zion Institute of Technology</p>
        <p>Transforming Lives Through Technology Education</p>
      </div>
    </div>
  `,
};

export const generateEmailTemplate = (templateName, data) => {
  const template = templates[templateName];
  if (!template) {
    throw new Error(`Template "${templateName}" not found`);
  }
  return template(data);
};
