import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Teacher = sequelize.define(
    'Teacher',
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      dob:{
        type: DataTypes.DATE,
        allowNull: true

      } ,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender:{
        type: DataTypes.STRING,
        allowNull: true
      },
      educationLevel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      teachingExperience: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subjects: {
        // For PostgreSQL use ARRAY; for other dialects consider DataTypes.JSON
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      teachingStyle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      teachingPhilosophy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    
      objectives: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      availability: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      preferredLevel: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      referral: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'Teachers',
      timestamps: true, // adds createdAt and updatedAt
    }
  );

  Teacher.associate = (models) => {
    Teacher.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Teacher;
};
