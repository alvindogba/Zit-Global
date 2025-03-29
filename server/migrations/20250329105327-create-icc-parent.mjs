'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Parents', {
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
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    relationToStudent: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    studentName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    studentAge: {
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
      // For PostgreSQL, using ARRAY; for other dialects consider Sequelize.JSON
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    },
    tutoringStyle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    learningGoals: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    availability: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    comments: {
      type: Sequelize.TEXT,
      allowNull: true,
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
  await queryInterface.dropTable('Parents');
}
