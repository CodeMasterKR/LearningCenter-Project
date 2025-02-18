import verifyToken from "../middlewares/verifyToken.js";
import { creatPolice } from "../middlewares/rolePolice.js";
import { Router } from "express";
import {
   create,
   findAll,
   findBySearch,
   findOne,
   remove,
   update,
} from "../controllers/course.controller.js";

const courseRoute = Router();

courseRoute.get("/search", findBySearch);
courseRoute.get("/", findAll);
courseRoute.get("/:id", findOne);
courseRoute.post("/", verifyToken, creatPolice(["admin", "teacher"]),  create);
courseRoute.patch("/:id", verifyToken, creatPolice(["admin", "teacher"]),  update);
courseRoute.delete("/:id", verifyToken, creatPolice(["admin", "teacher"]), remove);

export default courseRoute;

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Course name
 *         description:
 *           type: string
 *           description: Course description
 *         categoryId:
 *           type: integer
 *           description: Category ID for the course
 *         teacherId:
 *           type: integer
 *           description: Teacher ID for the course
 *         image:
 *           type: string
 *           description: Course image URL
 *
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of courses
 *       404:
 *         description: No courses found
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Bad request
 *
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Course details
 *       404:
 *         description: Course not found
 *   patch:
 *     summary: Update a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       404:
 *         description: Course not found
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 *
 * /api/courses/search:
 *   get:
 *     summary: Search courses
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Course name to search
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Category ID to filter
 *       - in: query
 *         name: teacherId
 *         schema:
 *           type: integer
 *         description: Teacher ID to filter
 *     responses:
 *       200:
 *         description: List of courses found
 *       404:
 *         description: No courses found
 */
