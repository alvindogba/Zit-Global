import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Payout extends Model {
    static associate(models) {
      Payout.belongsTo(models.Profile, { foreignKey: 'affiliate_id' });
    }
  }

  Payout.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    affiliate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    payment_details: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Payout',
    tableName: 'payouts',
    timestamps: false,
  });

  return Payout;
};
