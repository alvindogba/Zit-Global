"use strict";


 export const up = async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Admissions", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
      },
      countyOfResidence: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      nationality: {
        type: Sequelize.STRING,
      },
      applicantImage: {
        type: Sequelize.BLOB,
      },
      gender: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING, // Changed to STRING
      },
      email: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      identificationType: {
        type: Sequelize.STRING,
      },
      identificationNumber: {
        type: Sequelize.STRING, // Changed to STRING
      },
      emergencyContactName: {
        type: Sequelize.STRING,
      },
      emergencyContactNumber: {
        type: Sequelize.STRING, // Changed to STRING
      },
      relationshipType: {
        type: Sequelize.STRING,
      },
      emergencyPersonAddress: {
        type: Sequelize.STRING,
      },
      educationLevel: {
        type: Sequelize.STRING,
      },
      lastSchoolAttended: {
        type: Sequelize.STRING,
      },
      fieldOfStudy: {
        type: Sequelize.STRING,
      },
      yearOfGraduation: {
        type: Sequelize.DATE,
      },
      desiredProgram: {
        type: Sequelize.STRING,
      },
      personalStatement: {
        type: Sequelize.STRING,
      },
      communityImpact: {
        type: Sequelize.STRING,
      },
      churchRecoommendationLetter: {
        type: Sequelize.BLOB,
      },
      communityRecommendationLetter: {
        type: Sequelize.BLOB,
      },
      haveComputer: {
        type: Sequelize.STRING,
      },
      consented: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, // Added default value
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, // Added default value
      },
    });
  };

  export const down = async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Admissions");
  }
