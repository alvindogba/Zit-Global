// models/Admission.js

export default (sequelize, DataTypes) => {
  const Admission = sequelize.define('Admission', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    applicationNumber: {
      type: DataTypes.STRING,
      unique: true,
    },
    fullName: { type: DataTypes.STRING, allowNull: false },
    dateOfBirth: { type: DataTypes.DATE, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    countyOfResidence: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    identificationType: { type: DataTypes.STRING, allowNull: false },
    identificationNumber: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    nationality: { type: DataTypes.STRING, allowNull: false },
    emergencyContactName: { type: DataTypes.STRING, allowNull: false },
    emergencyPersonAddress: { type: DataTypes.STRING, allowNull: false },
    emergencyContactNumber: { type: DataTypes.STRING, allowNull: false },
    relationshipType: { type: DataTypes.STRING, allowNull: false },
    desiredProgram: { type: DataTypes.STRING, allowNull: false },
    educationLevel: { type: DataTypes.STRING, allowNull: false },
    lastSchoolAttended: { type: DataTypes.STRING, allowNull: false },
    fieldOfStudy: { type: DataTypes.STRING, allowNull: false },
    yearOfGraduation: { type: DataTypes.STRING, allowNull: false },
    personalStatement: { type: DataTypes.TEXT, allowNull: false },
    communityImpact: { type: DataTypes.TEXT, allowNull: false },
    haveComputer: { type: DataTypes.BOOLEAN, allowNull: false },
    consented: { type: DataTypes.BOOLEAN, allowNull: false },
    applicantImage: { type: DataTypes.STRING, allowNull: true },
    churchRecommendationLetter: { type: DataTypes.STRING, allowNull: true },
    communityRecommendationLetter: { type: DataTypes.STRING, allowNull: true },
    status: {
      type: DataTypes.ENUM('pending', 'under_review', 'interview_scheduled', 'accepted', 'rejected'),
      defaultValue: 'pending',
      allowNull: false,
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
      defaultValue: [],
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    timestamps: true,
    hooks: {
      beforeCreate: async (admission) => {
        // Generate application number: APP-YEAR-SEQUENTIAL_NUMBER
        const year = new Date().getFullYear();
        const count = await sequelize.models.Admission.count({
          where: {
            createdAt: {
              [sequelize.Op.gte]: new Date(year, 0, 1),
              [sequelize.Op.lt]: new Date(year + 1, 0, 1),
            }
          }
        });
        admission.applicationNumber = `APP-${year}-${(count + 1).toString().padStart(4, '0')}`;
      }
    }
  });
  return Admission;
};