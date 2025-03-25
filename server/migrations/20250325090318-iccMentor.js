'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Mentors', {
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
    profession: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mentorshipAreas: {
      // For PostgreSQL use ARRAY; for other dialects consider Sequelize.JSON
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    },
    priorExperience: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    experienceDetails: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    mentorshipFormat: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    availability: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    motivation: {
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
  await queryInterface.dropTable('Mentors');
}
