import { Sequelize } from "sequelize";
import config from "./config";

const { DB_PORT, DB_NAME, DB_USERNAME, DB_HOST, DB_PASSWORD } = config;

console.log("Sequelize Connection Settings:");
console.log("DB_NAME:", DB_NAME);
console.log("DB_USERNAME:", DB_USERNAME);
console.log("DB_PASSWORD:", DB_PASSWORD);
console.log("DB_HOST:", DB_HOST);
console.log("DB_PORT:", DB_PORT);

export const database = new Sequelize(
  DB_NAME as string,
  DB_USERNAME as string,
  DB_PASSWORD as string, // Ensure this is a string
  {
    host: DB_HOST as string,
    port: Number(DB_PORT), // Ensure port is a number
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      // Ensure encryption or other options if necessary
    },
  }
);
