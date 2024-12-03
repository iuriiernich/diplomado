import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import { User } from "./users.js";

export const Task = sequelize.define("tasks", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,

    validate: {
      notNull: {
        msg: "Task name cannot be null",
      },
    },
  },
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
