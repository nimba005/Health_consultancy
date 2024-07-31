"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consultation = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../config/index");
class Consultation extends sequelize_1.Model {
}
exports.Consultation = Consultation;
Consultation.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    officer_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    patient_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    consultation_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    consultation_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    consultation_summary: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: index_1.database,
    tableName: "Consultation",
});
exports.default = Consultation;