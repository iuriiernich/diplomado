import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import { Status } from "../constants/index.js";
import { Task } from "./tasks.js";
import logger from "../logs/logger.js";
import { encriptar } from '../common/bycript.js';

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,

    validate: {
      notNull: {
        msg: "Username is required.",
      },
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Password is required.",
      },
    },
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: Status.ACTIVE,
    validate: {
      isIn: {
        args: [[Status.ACTIVE, Status.INACTIVE]],
        msg: "Status must be either 'active' or 'inactive'.",
      },
    },
  },
});

User.hasMany(Task);
Task.belongsTo(User);

User.beforeCreate(async (user, options) => {
  try {
    user.password = await encriptar(user.password);
  } catch (error) {
    logger.error(error.message);
    throw new Error("Error al encriptar contraseña");
  }
});

User.beforeUpdate(async (user, options) => {
  try {
    user.password = await encriptar(user.password);
  } catch (error) {
    logger.error(error.message);
    throw new Error("Error al encriptar contraseña");
  }
});
