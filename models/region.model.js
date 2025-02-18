import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Region = sequelize.define(
   "Categories",
   {
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   },
   { timestamps: false }
);

export default Region;
