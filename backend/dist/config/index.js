"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("./config"));
const { DB_PORT, DB_NAME, DB_USERNAME, DB_HOST, DB_PASSWORD } = config_1.default;
console.log("Sequelize Connection Settings:");
console.log("DB_NAME:", DB_NAME);
console.log("DB_USERNAME:", DB_USERNAME);
console.log("DB_PASSWORD:", DB_PASSWORD);
console.log("DB_HOST:", DB_HOST);
console.log("DB_PORT:", DB_PORT);
exports.database = new sequelize_1.Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, // Ensure this is a string
{
    host: DB_HOST,
    port: Number(DB_PORT), // Ensure port is a number
    dialect: "postgres",
    logging: false,
    dialectOptions: {
    // Ensure encryption or other options if necessary
    },
});
