import { DataTypes, Model } from "sequelize";
import { database } from "../config/index";

export interface PatientAttributes {
  [x: string]: any;
  id: string;
  officer_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone_number?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Patient extends Model<PatientAttributes> {
    [x: string]: any;
}

Patient.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    officer_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull:true
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: database,
    tableName: "Patient",
  }
);

export default Patient;