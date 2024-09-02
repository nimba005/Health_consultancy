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
  DB_NAME!,
  DB_USERNAME!,
  DB_PASSWORD as string,
  {
    host: DB_HOST,
    port: DB_PORT as unknown as number,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      encrypt: true,
    },
  }
);