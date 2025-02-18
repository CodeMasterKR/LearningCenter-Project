import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import Course from "./course.model.js";

const Comment = sequelize.define("Comments", {
   message: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: User,
         key: "id",
      },
   },
   courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: Course,
         key: "id",
      },
   },
   star: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
});

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

Course.hasMany(Comment, { foreignKey: "courseId" });
Comment.belongsTo(Course, { foreignKey: "courseId" });

export default Comment;
