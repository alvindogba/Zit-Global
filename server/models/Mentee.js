export default (sequelize, DataTypes) =>{


    const Mentee = sequelize.define('Mentee', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
    
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
      },
      country:{
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      community: {
        type: DataTypes.STRING,
      },
      expertise: {
        type: DataTypes.STRING,
      },
      interest: {
        type: DataTypes.STRING,
      },
      goals: {
        type: DataTypes.STRING,
      },
      preferredSchedule: {
        type: DataTypes.STRING,
      },
      mentorPreferences: {
        type: DataTypes.STRING,
      },
    }, {
      tableName: 'mentees',
      timestamps: true,
    });
    return Mentee
    }
    