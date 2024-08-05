import { DataTypes, Model } from "sequelize";
import { database } from "../config/index";

export enum role {
  ADMIN = "Admin",
  USER = "User",
}


export interface UserAttributes {
  id: string;
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  phone_number?: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User extends Model<UserAttributes> {
    [x: string]: any;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
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
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required",
        },
        notEmpty: {
          msg: "Password is required",
        },
      },
    },
    role: {
      type: DataTypes.ENUM(...Object.values(role)),
      allowNull: false,
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
    tableName: "User",
  }
);

export default User;