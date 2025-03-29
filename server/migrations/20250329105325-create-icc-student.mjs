'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Students', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dob: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    schoolName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gradeLevel: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    subjects: {
      // For PostgreSQL, using ARRAY; if using another dialect consider using Sequelize.JSON
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    },
    learningStyle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tutoringNeeds: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    objectives: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    availability: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tutorType: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    referral: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Students');
}
