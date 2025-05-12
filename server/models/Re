import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Referral extends Model {
    static associate(models) {
      Referral.belongsTo(models.Profile, { foreignKey: 'affiliate_id' });
    }
  }

  Referral.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    affiliate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    commission: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Referral',
    tableName: 'referrals',
    timestamps: false,
  });

  return Referral;
};
