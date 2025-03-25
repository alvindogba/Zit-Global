import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Student = sequelize.define(
    'Student',
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      schoolName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gradeLevel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subjects: {
        // For PostgreSQL, using ARRAY; for other dialects, consider DataTypes.JSON.
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      learningStyle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tutoringNeeds: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      objectives: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      availability: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tutorType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      referral: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'Students',
      timestamps: true, // adds createdAt and updatedAt
    }
  );

  return Student;
};
