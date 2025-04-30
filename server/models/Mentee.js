import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Mentee = sequelize.define(
    'Mentee',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,        // ensures 1:1
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      occupation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mentorshipAreas: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      goals: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      challenges: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      availability: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mentorType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      referral: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'Mentees',
      timestamps: true, // createdAt and updatedAt will be added automatically
    }
  );
  Mentee.associate = (models) => {
    Mentee.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Mentee;
};
