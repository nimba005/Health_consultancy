import { DataTypes, Model } from "sequelize";
import { database } from "../config/index";

export interface ConsultationAttributes {
  [x: string]: any;
  id: string;
  officer_id: string;
  patient_id: string;
  consultation_date: Date;
  consultation_type: string;
  consultation_summary?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Consultation extends Model<ConsultationAttributes> {
    [x: string]: any;
}

Consultation.init(
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
    patient_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    consultation_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    consultation_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    consultation_summary: {
      type: DataTypes.STRING,
      allowNull: true,
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
    tableName: "Consultation",
  }
);

export default Consultation;