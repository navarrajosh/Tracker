const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    'trackerdb',
    'admin',
    '123456789',
    {
      host: 'localhost',
      dialect: 'mysql'
    }
  );
  
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });
  

const User = sequelize.define("users", {
    eid: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    account: {
        type: DataTypes.STRING,
        allowNull:true
    },
    contact:{
        type: DataTypes.BIGINT,
        allowNull:true
    },
    site:{
        type: DataTypes.STRING,
        allowNull:true
    },
    username:{
        type: DataTypes.STRING,
        allowNull:true
    }
    
});

sequelize.sync().then(() => {
   console.log('user table created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});

module.exports = sequelize;
module.exports = User;

