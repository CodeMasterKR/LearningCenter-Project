import User from "../models/user.model.js";
import { userPatchValid } from "../validations/user-valid.js";
import Course from "../models/course.model.js";
import Comment from "../models/comment.model.js";

export async function findAll(req, res) {
   try {
      let users = await User.findAll({ include: [Course, Comment] });

      if (!users.length) {
         return res.status(200).json({ message: "No users yet." });
      }

      res.status(200).json({ data: users });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function findOne(req, res) {
   try {
      let { id } = req.params;
      let user = await User.findByPk(id, { include: [Course, Comment] });

      if (!user) {
         return res.status(404).json({ message: "Not found user." });
      }

      res.status(200).json({ data: user });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function remove(req, res) {
   try {
      let { id } = req.params;
      let user = await User.findByPk(id);

      if (!user) {
         return res.status(404).json({ message: "Not found user." });
      }

      await user.destroy();

      res.status(200).json({ message: "Deleted." });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function update(req, res) {
   try {
      let { error, value } = userPatchValid.validate(req.body);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      let { id } = req.params;
      let user = await User.findByPk(id);

      if (!user) {
         return res.status(404).json({ message: "Not found user." });
      }

      let { isActive, role } = value;
      if (isActive || (role && req.user.role != "admin")) {
         return res
            .status(400)
            .json({ message: "Not allowed to updated isActive or role." });
      }

      await user.update(value);

      res.status(200).json({ data: user });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function findBySearch(req, res) {
   try {
      let query = {};
      for (let [key, value] of Object.entries(req.query)) {
         if (value) {
            query[key] = value;
         }
      }
      let users = await User.findAll({
         where: query,
         include: [Course, Comment],
      });

      if (!users.length) {
         return res.status(404).json({ message: "Not found user." });
      }

      res.status(200).json({ data: users });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}
