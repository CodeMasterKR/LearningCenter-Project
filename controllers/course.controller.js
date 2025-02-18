import Category from "../models/category.model.js";
import Course from "../models/course.model.js";
import User from "../models/user.model.js";
import { Op } from "sequelize";

async function findAll(req, res) {
   try {
      let courses = await Course.findAll({
         include: [User, Category],
      });
      if (courses) {
         res.status(200).json({ data: courses });
      } else {
         res.status(200).json({ message: "Course not found!" });
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

async function findOne(req, res) {
   try {
      let { id } = req.params;
      let course = await Course.findByPk(id, {
         include: [Category, User],
      });
      if (course) {
         res.status(200).json({ message: course });
      } else {
         res.status(200).json({ data: "Course not found!" });
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

// SEARCH API  api/course/search?name=Javascript&categoryId=1&teacherId=3
async function findBySearch(req, res) {
   let { name, categoryId, teacherId } = req.query;
   let filtes = {};
   if (name) {
      filtes.name = {
         [Op.like]: `%${name}%`,
      };
   }

   if (categoryId) {
      filtes.categoryId = categoryId;
   }

   if (teacherId) {
      filtes.teacherId = teacherId;
   }

   const courses = await Course.findAll(
      {
         include: [Category, User],
      },
      {
         where: filtes,
      }
   );
   if (courses.length > 0) {
      res.status(200).json({ data: courses });
   } else {
      res.status(200).json({ message: "Courses not found!" });
   }
}

async function create(req, res) {
   try {
      let { teacherId } = req.body;

      if (req.user.role == "teacher") {
         if (teacherId != req.user.id) {
            return res.status(400).json({ message: "Not allowed" });
         }
      }

      let createdCourse = await Course.create(req.body);
      res.status(200).json({ data: createdCourse });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

async function update(req, res) {
   try {
      let { id } = req.params;

      let found = await Course.findByPk(id);
      if (!found) {
         return res.status(200).json({ message: "Course not found!" });
      }

      if (req.user.role == "teacher") {
         if (found.teacherId != req.user.id) {
            return res.status(400).json({ message: "Not allowed" });
         }
      }

      let dataBody = req.body;
      let [count] = await Course.update(dataBody, {
         where: { id },
      });

      if (count) {
         let updatedCourse = await Course.findByPk(id);
         res.status(200).json({ data: updatedCourse });
      } else {
         res.status(200).json({ message: "Course not found!" });
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

async function remove(req, res) {
   try {
      let { id } = req.params;
      let currentCourse = await Course.findByPk(id);

      if (req.user.role == "teacher") {
         if (currentCourse.teacherId != req.user.id) {
            return res.status(400).json({ message: "Not allowed" });
         }
      }

      if (currentCourse) {
         await Course.destroy({
            where: { id },
         });
         res.status(200).json({ message: "Course was deleted successfully!" });
      } else {
         res.status(200).json({ message: "Course not found!" });
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export { findAll, findOne, findBySearch, create, update, remove };
