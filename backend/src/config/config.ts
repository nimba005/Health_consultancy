import merge from 'lodash.merge';
import dotenv from 'dotenv';

dotenv.config();

const stage: any = process.env.NODE_ENV || 'development';
let config;

if (stage === "development") {
    config = require("./dev").default;
} else if (stage === "production") {
    config = require("./prod").default;
}

// Log the values to confirm they're being read correctly
console.log("Environment Variables:");
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USERNAME:", process.env.DB_USERNAME);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

export default merge(
  {
    stage,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_HOST: process.env.DB_HOST,
    DB_PASSWORD: process.env.DB_PASSWORD,
  },
  config
);