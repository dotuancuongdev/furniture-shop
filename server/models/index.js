import { DataTypes } from "sequelize"
import sequelize from "../db.js"

export const Category = sequelize.define("Category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(1024),
  },
})
