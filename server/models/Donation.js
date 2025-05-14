export default (sequelize, DataTypes) => {
  const Donation = sequelize.define('Donations', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transactionId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    state: {
      type: DataTypes.STRING,
    
    },
   
    country: {
      type: DataTypes.STRING,
    
    },
    giftType: {
      type: DataTypes.ENUM('one-time', 'monthly'),
    
    },
    ref_code: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    tableName: 'Donations',
    timestamps: true,
  });
  
  return Donation;
};
