const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 100,
    min: 5,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize.sync()
  .then(() => {
    console.log('Database synchronized.');
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err);
  });
  
module.exports = sequelize;
