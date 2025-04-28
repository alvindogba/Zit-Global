import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const SchoolAdmin = sequelize.define(
    'SchoolAdmin',
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
      schoolName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      schoolLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      services: {
        // For PostgreSQL use ARRAY; for other dialects consider DataTypes.JSON
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      gradeLevels: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      supportMode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      challenges: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      contactMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bestTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      additionalComments: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      referral: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'SchoolAdmins',
      timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
  );

SchoolAdmin.associate = (models) => {
    SchoolAdmin.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return SchoolAdmin;
};
