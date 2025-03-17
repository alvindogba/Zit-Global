'use strict';

import { DataTypes, QueryInterface } from 'sequelize';

export const up = async (queryInterface) => {
  await queryInterface.createTable('Admissions', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    applicationNumber: {
      type: DataTypes.STRING,
      unique: true,
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    dateOfBirth: { type: DataTypes.DATE, allowNull: false },
    gender: { type: DataTypes.STRING },
    identificationType: { type: DataTypes.STRING, allowNull: false },
    identificationNumber: { type: DataTypes.STRING, allowNull: false },
    nationality: { type: DataTypes.STRING, allowNull: false },
    haveComputer: { type: DataTypes.BOOLEAN, allowNull: false },
    desiredProgram: { type: DataTypes.STRING, allowNull: false },
    academicYear: { type: DataTypes.STRING },
    educationLevel: { type: DataTypes.STRING },
    yearOfGraduation: { type: DataTypes.STRING },
    lastSchoolAttended: { type: DataTypes.STRING },
    computerKnowledge: { type: DataTypes.STRING },
    personalStatement: { type: DataTypes.TEXT },
    communityImpact: { type: DataTypes.TEXT },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    emergencyContactName: { type: DataTypes.STRING, allowNull: false },
    emergencyPersonAddress: { type: DataTypes.STRING, allowNull: false },
    emergencyContactNumber: { type: DataTypes.STRING, allowNull: false },
    relationshipType: { type: DataTypes.STRING, allowNull: false },
    consented: { type: DataTypes.BOOLEAN, allowNull: false },
    applicantImage: { type: DataTypes.STRING },
    churchRecommendationLetter: { type: DataTypes.STRING },
    communityRecommendationLetter: { type: DataTypes.STRING },
    status: {
      type: DataTypes.ENUM('pending', 'under_review', 'interview_scheduled', 'accepted', 'rejected'),
      defaultValue: 'pending',
    },
    interviewDate: { type: DataTypes.DATE },
    interviewLocation: { type: DataTypes.STRING },
    admissionDecisionDate: { type: DataTypes.DATE },
    lastNotificationSent: { type: DataTypes.DATE },
    notificationHistory: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    notes: { type: DataTypes.TEXT },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable('Admissions');
};
