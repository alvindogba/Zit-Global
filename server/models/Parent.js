import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Parent = sequelize.define(
    'Parent',
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
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
      relationToStudent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studentName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studentAge: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      schoolName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gradeLevel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subjects: {
        // For PostgreSQL use ARRAY; for other dialects consider DataTypes.JSON
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      tutoringStyle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      learningGoals: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      availability: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comments: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      referral: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'Parents',
      timestamps: true, // adds createdAt and updatedAt
    }
  );

  Parent.associate = (models) => {
    Parent.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Parent;
};
