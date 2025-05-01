import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send confirmation email to Students
export const sendStudentConfirmation = async (userEmail, fullName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Welcome to ZIT - Impact and Connect Registration Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank You for Registering for our Impact and Connect Program!</h2>
        <p>Dear ${fullName},</p>
        <p>We have successfully received your registration details.</p>
        <p>Our team will review your information and reach out to you soon with further instructions.</p>
        <br/>
        <p>Best regards,</p>
        <p>The ZIT Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending student confirmation email:', error);
    throw error;
  }
};
// Send tutor 
export const sendTutorConfirmation = async (userEmail, fullName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Thank You for Signing Up as a Tutor',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank You for Signing Up!</h2>
        <p>Dear ${fullName},</p>
        <p>We appreciate your willingness to Tutor and guide students.</p>
        <p>We have received your application and will reach out soon regarding the next steps.</p>
        <br/>
        <p>Best regards,</p>
        <p>The ZIT Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending mentor confirmation email:', error);
    throw error;
  }
};

// Send confirmation email to Parents
export const sendParentConfirmation = async (userEmail, fullName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Thank You for Registering - Parent Application Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank You for Your Submission!</h2>
        <p>Dear ${fullName},</p>
        <p>We have successfully received your registration details as a parent.</p>
        <p>We will be in touch soon to discuss the next steps.</p>
        <br/>
        <p>Best regards,</p>
        <p>The ZIT Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending parent confirmation email:', error);
    throw error;
  }
};

// Send confirmation email to Mentors
export const sendMentorConfirmation = async (userEmail, fullName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Thank You for Signing Up as a Mentor',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank You for Signing Up!</h2>
        <p>Dear ${fullName},</p>
        <p>We appreciate your willingness to mentor and guide students.</p>
        <p>We have received your application and will reach out soon regarding the next steps.</p>
        <br/>
        <p>Best regards,</p>
        <p>The ZIT Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending mentor confirmation email:', error);
    throw error;
  }
};

// Send confirmation email to Mentees
export const sendMenteeConfirmation = async (userEmail, fullName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Thank You for Signing Up as a Mentee',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank You for Signing Up!</h2>
        <p>Dear ${fullName},</p>
        <p>We appreciate your willingness to be a mentee.</p>
        <p>We have received your application and will reach out soon regarding the next steps.</p>
        <br/>
        <p>Best regards,</p>
        <p>The ZIT Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending mentee confirmation email:', error);
    throw error;
  }
};

// Send confirmation email to School Admins
export const sendSchoolAdminConfirmation = async (userEmail, fullName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Your School Registration Has Been Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank You for Your Submission!</h2>
        <p>Dear ${fullName},</p>
        <p>We have received your school's registration request.</p>
        <p>Our team will review the details and get in touch with you shortly.</p>
        <br/>
        <p>Best regards,</p>
        <p>The ZIT Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending school admin confirmation email:', error);
    throw error;
  }
};

// Send confirmation email to Teachers
export const sendTeacherConfirmation = async (userEmail, fullName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Thank You for Registering - Teacher Application Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank You for Your Submission!</h2>
        <p>Dear ${fullName},</p>
        <p>We have successfully received your registration details as a teacher.</p>
        <p>We will be in touch soon to discuss the next steps.</p>
        <br/>
        <p>Best regards,</p>
        <p>The ZIT Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending parent confirmation email:', error);
    throw error;
  }
};

// Send notification to admin for any new submission
export const sendAdminNotification = async (submissionType, submissionData) => {
  let details = '';
  for (const [key, value] of Object.entries(submissionData)) {
    details += `<p><strong>${key}:</strong> ${value}</p>`;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New ${submissionType} Submission Received`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New ${submissionType} Registration</h2>
        ${details}
        <p>Please check the admin panel for more details.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending admin notification:', error);
    throw error;
  }
};

