import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Course from "./course.model.js";

const Lesson = sequelize.define("Lessons", {
   link: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   description: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: Course,
         key: "id",
      },
   },
});

Course.hasMany(Lesson, { foreignKey: "courseId" });
Lesson.belongsTo(Course, { foreignKey: "courseId" });

export default Lesson;
