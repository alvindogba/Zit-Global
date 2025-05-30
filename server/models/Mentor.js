import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Mentor = sequelize.define(
    'Mentor',
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,        // ensures 1:1
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profession: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mentorshipAreas: {
        // For PostgreSQL; for other dialects consider using DataTypes.JSON
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      priorExperience: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      experienceDetails: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      mentorshipFormat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      availability: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      motivation: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      referral: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'Mentors',
      timestamps: true, // createdAt and updatedAt will be added automatically
    }
  );
  Mentor.associate = (models) => {
    Mentor.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user', // Alias for the association
    });
  }

  return Mentor;
};
