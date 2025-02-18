import Course from "../models/course.model.js";
import Lesson from "../models/lesson.model.js";
import { LessonPATCH, LessonPOST } from "../validations/Lesson.validate.js";

async function findAll(req, res) {
   try {
      let All = await Lesson.findAll({ include: [Course] });
      res.status(200).json({ data: All });
   } catch (e) {
      res.status(401).json({ message: e.message });
   }
}
async function findOne(req, res) {
   try {
      let { id } = req.params;
      let data = await Lesson.findByPk(id, { include: [Course] });
      if (!data) {
         return res.status(404).json({ message: "Not Fount Lesson" });
      }
      res.status(200).json({ data });
   } catch (e) {
      res.status(401).json({ message: e.message });
   }
}
async function pages(req, res) {
   try {
      let { limit, offset } = req.query;

      limit = limit ? parseInt(limit) : 10;
      offset = offset ? parseInt(offset) - 1 : 0;

      let data = await Lesson.findAll({
         limit: limit,
         offset: offset * limit,
      });
      if (data.length == 0) {
         return res.status(404).json({ message: "Not Fount" });
      }
      res.status(200).json({ data });
   } catch (e) {
      res.status(401).json({ message: e.message });
   }
}
async function findBySeorch(req, res) {
   try {
      let query = req.query;
      let key = Object.keys(query);
      let value = Object.values(query);
      let newquery = {};

      value.forEach((val, index) => {
         if (val) {
            newquery[key[index]] = val;
         }
      });
      let data = await Lesson.findAll({ where: newquery });
      if (data.length == 0) {
         res.status(401).json({ message: "Not fount" });
      }
      res.status(200).json({ data });
   } catch (e) {
      res.status(401).json({ message: e.message });
   }
}
async function create(req, res) {
   try {
      let { error, value } = LessonPOST.validate(req.body);
      if (error) {
         res.status(401).json({ message: error.message });
         return;
      }
      let Createdata = await Lesson.create(value);
      if (!Createdata) {
         return res
            .status(500)
            .json({ message: "Bazaga saqlashda hatolig bor" });
      }
      res.status(200).json({ message: "creyted", data: Createdata });
   } catch (e) {
      res.status(401).json({ message: e.message });
   }
}
async function update(req, res) {
   try {
      let { id } = req.params;
      let newData = req.body;

      let { error, value } = LessonPATCH.validate(newData);
      if (error) {
         res.status(401).json({ message: error.message });
         return;
      }
      let [data] = await Lesson.update(value, { where: { id } });
      if (!data) {
         return res.status(500).json({ message: "wrong update" });
      }
      res.status(200).json({ message: "Lesson update" });
   } catch (e) {
      res.status(401).json({ message: e.message });
   }
}
async function remove(req, res) {
   try {
      let { id } = req.params;
      let remove = await Lesson.destroy({ where: { id } });
      if (!remove) {
         return res.status(401).json({ message: "whrong delete" });
      }
      res.status(200).json({ message: "Lesson delete" });
   } catch (e) {
      res.status(401).json({ message: e.message });
   }
}

export { findAll, findOne, pages, findBySeorch, create, update, remove };
