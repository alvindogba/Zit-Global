import nodemailer from 'nodemailer';
import { generateEmailTemplate } from './emailTemplates.js';

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendApplicationConfirmation = async (admission) => {
  const template = generateEmailTemplate('application_confirmation', {
    applicationNumber: admission.applicationNumber,
    fullName: admission.fullName,
    program: admission.desiredProgram,
    applicationDate: new Date(admission.createdAt).toLocaleDateString(),
  });

  await transporter.sendMail({
    from: `"ZIT Admissions" <${process.env.EMAIL_USER}>`,
    to: admission.email,
    subject: 'Application Received - Zion Institute of Technology',
    html: template,
  });

  // Also send notification to admin
  await transporter.sendMail({
    from: `"ZIT Admissions System" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Application Received - ${admission.applicationNumber}`,
    html: generateEmailTemplate('admin_application_notification', {
      applicationNumber: admission.applicationNumber,
      fullName: admission.fullName,
      program: admission.desiredProgram,
      email: admission.email,
      phone: admission.phone,
    }),
  });
};

export const sendInterviewInvitation = async (admission) => {
  const template = generateEmailTemplate('interview_invitation', {
    fullName: admission.fullName,
    applicationNumber: admission.applicationNumber,
    interviewDate: new Date(admission.interviewDate).toLocaleString(),
    interviewLocation: admission.interviewLocation,
    program: admission.desiredProgram,
  });

  await transporter.sendMail({
    from: `"ZIT Admissions" <${process.env.EMAIL_USER}>`,
    to: admission.email,
    subject: 'Interview Invitation - Zion Institute of Technology',
    html: template,
  });
};

export const sendAdmissionDecision = async (admission) => {
  const templateName = admission.status === 'accepted' ? 'acceptance_letter' : 'rejection_letter';
  const subject = admission.status === 'accepted' ? 
    'Congratulations! Admission Decision - Zion Institute of Technology' :
    'Admission Decision - Zion Institute of Technology';

  const template = generateEmailTemplate(templateName, {
    fullName: admission.fullName,
    applicationNumber: admission.applicationNumber,
    program: admission.desiredProgram,
    startDate: admission.status === 'accepted' ? 'To be announced' : null,
  });

  await transporter.sendMail({
    from: `"ZIT Admissions" <${process.env.EMAIL_USER}>`,
    to: admission.email,
    subject: subject,
    html: template,
  });
};

export const sendStatusUpdateNotification = async (admission, previousStatus) => {
  const template = generateEmailTemplate('status_update', {
    fullName: admission.fullName,
    applicationNumber: admission.applicationNumber,
    previousStatus: previousStatus,
    currentStatus: admission.status,
    program: admission.desiredProgram,
  });

  await transporter.sendMail({
    from: `"ZIT Admissions" <${process.env.EMAIL_USER}>`,
    to: admission.email,
    subject: 'Application Status Update - Zion Institute of Technology',
    html: template,
  });
};
