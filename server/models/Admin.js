import { DataTypes,  } from "sequelize";

export default (sequelize) => {
    const Admin = sequelize.define(
        'Admin',
    
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
          }
    },
    {
        tableName: 'Tutors',
        timestamps: true, // createdAt and updatedAt will be added automatically
      }
)
Admin.associate = (models) => {
    Admin.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
};
return Admin

}