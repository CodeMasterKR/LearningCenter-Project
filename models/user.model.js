import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("users", {
   firstName: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   lastName: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   email: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   password: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   year: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   role: {
      type: DataTypes.ENUM("student", "admin", "teacher"),
      allowNull: false,
   },
   exprience: {
      type: DataTypes.INTEGER,
      allowNull: true,
   },
   image: {
      type: DataTypes.STRING,
      allowNull: true,
   },
   isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
   },
});

export default User;
