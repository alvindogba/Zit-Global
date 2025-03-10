// models/ErrorLog.js
export default (sequelize, DataTypes) =>{


const ErrorLog = sequelize.define('ErrorLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  error: {
    type: DataTypes.TEXT,

  },
  donationData: {
    type: DataTypes.JSONB,
  },
}, {
  tableName: 'error_logs',
  timestamps: true,
});
return ErrorLog
}
