const { Sequelize } = require('sequelize');
require('dotenv').config();

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT
} = process.env;

if (!DB_NAME || !DB_USERNAME || !DB_PASSWORD || !DB_HOST || !DB_PORT) {
  console.error('One or more environment variables are missing or undefined.');
  process.exit(1);
}

const sequelize = new Sequelize(
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  {
    host: DB_HOST,
    port: parseInt(DB_PORT, 10), // Ensure port is an integer
    dialect: 'postgres',
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
