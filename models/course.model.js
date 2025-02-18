import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Category from "./category.model.js";
import User from "./user.model.js";

const Course = sequelize.define("Courses", {
   name: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   description: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: Category,
         key: "id",
      },
   },
   teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: User,
         key: "id",
      },
   },
   image: {
      type: DataTypes.STRING,
      allowNull: false,
   },
});

Category.hasMany(Course, { foreignKey: "categoryId" });
Course.belongsTo(Category, { foreignKey: "categoryId" });

User.hasMany(Course, { foreignKey: "teacherId" });
Course.belongsTo(User, { foreignKey: "teacherId" });

export default Course;
