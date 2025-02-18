import { Router } from "express";
import {
   create,
   findAll,
   findBySeorch,
   findOne,
   pages,
   remove,
   update,
} from "../controllers/Lesson.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import { creatPolice } from "../middlewares/rolePolice.js";

const lessonRouter = Router();

lessonRouter.get("/", findAll);
lessonRouter.get("/pages", pages);
lessonRouter.get("/search", findBySeorch);
lessonRouter.get("/:id", findOne);
lessonRouter.post("/", verifyToken, creatPolice(["admin", "teacher"]), create);
lessonRouter.patch("/:id", verifyToken, creatPolice(["admin", "teacher"]), update);
lessonRouter.delete("/:id", verifyToken, creatPolice(["admin", "teacher"]), remove);

export default lessonRouter;

/**
 * @swagger
 * components:
 *   schemas:
 *     Lesson:
 *       type: object
 *       properties:
 *         link:
 *           type: string
 *           description: Lesson video or document link
 *         description:
 *           type: string
 *           description: Lesson description
 *         courseId:
 *           type: integer
 *           description: Associated course ID
 *
 * /api/lessons:
 *   get:
 *     tags: [Lessons]
 *     summary: Get all lessons
 *     responses:
 *       200:
 *         description: List of lessons
 *       404:
 *         description: No lessons found
 *   post:
 *     tags: [Lessons]
 *     summary: Create a new lesson
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lesson'
 *     responses:
 *       201:
 *         description: Lesson created successfully
 *       400:
 *         description: Bad request
 *
 * /api/lessons/{id}:
 *   get:
 *     tags: [Lessons]
 *     summary: Get a lesson by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lesson details
 *       404:
 *         description: Lesson not found
 *   patch:
 *     tags: [Lessons]
 *     summary: Update a lesson by ID
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
 *             $ref: '#/components/schemas/Lesson'
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *       404:
 *         description: Lesson not found
 *   delete:
 *     tags: [Lessons]
 *     summary: Delete a lesson by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lesson deleted successfully
 *       404:
 *         description: Lesson not found
 *
 * /api/lessons/search:
 *   get:
 *     tags: [Lessons]
 *     summary: Search lessons
 *     parameters:
 *       - in: query
 *         name: link
 *         schema:
 *           type: string
 *         description: Lesson link to search
 *       - in: query
 *         name: courseId
 *         schema:
 *           type: integer
 *         description: Course ID to filter
 *     responses:
 *       200:
 *         description: List of lessons found
 *       404:
 *         description: No lessons found
 */
