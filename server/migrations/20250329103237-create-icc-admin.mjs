'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('SchoolAdmins', {
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
    schoolName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    schoolLocation: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    services: {
      // For PostgreSQL, using ARRAY; for other dialects consider Sequelize.JSON
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    },
    gradeLevels: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    supportMode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    challenges: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    contactMethod: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bestTime: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    additionalComments: {
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
  await queryInterface.dropTable('SchoolAdmins');
}
