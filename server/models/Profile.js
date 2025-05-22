import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Profile extends Model {
    static associate(models) {
      Profile.hasMany(models.Referral, { foreignKey: 'affiliate_id' });
      Profile.hasMany(models.Payout, { foreignKey: 'affiliate_id' });
    }
  }

  Profile.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    full_name: DataTypes.STRING,
    avatar_url: DataTypes.TEXT,
    affiliate_code: {
      type: DataTypes.STRING(8),
      unique: true,
      allowNull: false,
    },
    affiliate_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    reset_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    total_earning: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ballance: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stripe_account_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    paypal_email: {
      type: DataTypes.STRING,
      allowNull: true
    }

  }, {
    sequelize,
    modelName: 'Profile',
    tableName: 'profiles',
    timestamps: false,
  });

  return Profile;
};
