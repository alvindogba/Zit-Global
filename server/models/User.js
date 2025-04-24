export default (sequelize, DataTypes) => {
    const User = sequelize.define(
      "User",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: { isEmail: true },
        },
        password_hash: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        full_name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        phone_number: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        role: {
          type: DataTypes.ENUM(
            "student",
            "tutor",
            "tutee",
            "mentor",
            "mentee",
            "admin",
            "administrator"
          ),
          allowNull: false,
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        tableName: "Users",
        timestamps: true, // createdAt and updatedAt
        underscored: true, // snake_case DB fields
      }
    );
  
    User.associate = (models) => {
      User.hasOne(models.Admission, { foreignKey: "user_id", as: "admission" });
      User.hasOne(models.Tutor, { foreignKey: "user_id", as: "tutor" });
      User.hasOne(models.Tutees, { foreignKey: "user_id", as: "tutee" });

    };
  
    return User;
  };
  