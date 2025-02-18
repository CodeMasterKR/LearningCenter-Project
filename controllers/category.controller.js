import Category from "../models/category.model.js";
import { Op } from "sequelize";
import Course from "../models/course.model.js";

async function findAll(req, res) {
   try {
      let categories = await Category.findAll({
         include: [Course],
      });

      if (categories) {
         res.status(200).json({ data: categories });
      } else {
         res.status(200).json({ message: "Category not found" });
      }
   } catch (error) {
      console.log(error);
   }
}

async function findOne(req, res) {
   try {
      let { id } = req.params;

      let category = await Category.findByPk(id, {
         include: [Course],
      });
      if (category) {
         res.status(200).json({ data: category });
      } else {
         res.status(200).json({ message: "Category not found" });
      }
   } catch (error) {
      console.log(error);
   }
}

// SEARCH API  api/category/search?name=Javascript&categoryId=1&teacherId=3

async function findBySearch(req, res) {
   let { name } = req.query;
   let filtes = {};

   if (name) {
      filtes.name = {
         [Op.like]: `%${name}%`,
      };
   }

   const categories = await Category.findAll({
      where: filtes,
      include: [Course],
   });

   if (categories.length > 0) {
      res.status(200).json({ data: categories });
   } else {
      res.status(200).json({ message: "Category not found!" });
   }
}

async function create(req, res) {
   try {
      let { name, description, image } = req.body;
      let newCategory = await Category.create({
         name,
         description,
         image,
      });
      res.status(201).json({ data: newCategory });
   } catch (error) {
      console.log(error);
   }
}

async function update(req, res) {
   try {
      let { id } = req.params;
      let dataBody = req.body;
      let [updatedCount] = await Category.update(dataBody, {
         where: { id },
      });
      if (updatedCount) {
         let updatedCategory = await Category.findByPk(id);
         res.status(200).json({ data: updatedCategory });
      } else {
         res.status(200).json({ message: "Category  not found!" });
      }
   } catch (error) {
      console.log(error);
   }
}

async function remove(req, res) {
   try {
      let { id } = req.params;
      let currentCategory = await Category.findByPk(id);
      if (currentCategory) {
         await Category.destroy({
            where: { id },
         });
         res.status(200).json({
            message: "Category was deleted successfully!",
         });
      } else {
         res.status(200).json({ message: "Category not found!" });
      }
   } catch (error) {
      console.log(error);
   }
}

export { findAll, findOne, findBySearch, create, update, remove };
