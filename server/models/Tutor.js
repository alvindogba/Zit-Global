import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Tutor = sequelize.define(
    'Tutor',
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currentRole: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subjects: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      priorTeachingExperience: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      experienceDetails: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tutoringFormat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      availability: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      educationalBackground: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      referral: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'Tutors',
      timestamps: true, // createdAt and updatedAt will be added automatically
    }
  );
  Tutor.associate = (models) => {
    Tutor.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Tutor;
};
