export default (sequelize, DataTypes) =>{


    const Mentor = sequelize.define('Mentor', {
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
      motivation: {
        type: DataTypes.STRING,
      },




    }, {
      tableName: 'mentors',
      timestamps: true,
    });
    return Mentor
    }
    