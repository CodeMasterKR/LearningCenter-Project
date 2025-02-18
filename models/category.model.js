import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Category = sequelize.define(
   "Categories",
   {
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      photo: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   },
   { timestamps: false }
);

export default Category;
