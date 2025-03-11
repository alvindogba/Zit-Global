// models/Donation.js
export default (sequelize, DataTypes) => {
  const Donation = sequelize.define('Donations', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'USD',
    },
    donationType: {
      type: DataTypes.ENUM('one-time', 'monthly'),
      allowNull: true,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transactionId: {
      type: DataTypes.STRING,
      unique: true,
    },
    hideFromPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    selectedLocation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    selectedCountry: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
    receiptNumber: {
      type: DataTypes.STRING,
      unique: true,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    errorDetails: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
  }, {
    tableName: 'Donations',
    timestamps: true,
    hooks: {
      beforeCreate: async (donation) => {
        // Generate unique receipt number
        const year = new Date().getFullYear();
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        donation.receiptNumber = `DON-${year}-${random}`;
      },
    },
  });
  return Donation;
}
