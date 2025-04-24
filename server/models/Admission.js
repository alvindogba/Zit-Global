// models/Admission.js
import { Op } from 'sequelize';
export default (sequelize, DataTypes) => {
  const Admission = sequelize.define('Admission', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,        // ensures 1:1
    },
    applicationNumber: {
      type: DataTypes.STRING,
      unique: true,
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    dateOfBirth: { type: DataTypes.DATE, allowNull: false },
    gender: { type: DataTypes.STRING, },
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
    applicantImage: { type: DataTypes.STRING, allowNull: true },
    churchRecommendationLetter: { type: DataTypes.STRING, allowNull: true },
    communityRecommendationLetter: { type: DataTypes.STRING, allowNull: true },

    status: {
      type: DataTypes.ENUM('pending', 'under_review', 'interview_scheduled', 'accepted', 'rejected'),
      defaultValue: 'pending',
      allowNull: true,
    },
    interviewDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    interviewLocation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    admissionDecisionDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lastNotificationSent: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notificationHistory: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    timestamps: true,
    hooks: {
      beforeCreate: async (admission, options) => {
        const year = new Date().getFullYear();
        
        const count = await admission.sequelize.models.Admission.count({
          where: {
            createdAt: {
              [Op.gte]: new Date(year, 0, 1),
              [Op.lt]: new Date(year + 1, 0, 1),
            }
          }
        });
    
        admission.applicationNumber = `APP-${year}-${(count + 1).toString().padStart(4, '0')}`;
      }
    }
  });
  Admission.associate = (models) => {
    Admission.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Admission;
};