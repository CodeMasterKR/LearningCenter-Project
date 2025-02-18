import { Router } from "express";
import {
   create,
   findAll,
   findBySeorch,
   findOne,
   pages,
   remove,
   update,
} from "../controllers/Comment.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const CommentRouter = Router();

CommentRouter.get("/", findAll);
CommentRouter.get("/pages", pages);
CommentRouter.get("/search", findBySeorch);
CommentRouter.get("/:id", findOne);
CommentRouter.post("/", verifyToken, create);
CommentRouter.patch("/:id", verifyToken, update);
CommentRouter.delete("/:id", verifyToken, remove);

export default CommentRouter;

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Comment message
 *           example: "This is a great course!"
 *         userId:
 *           type: integer
 *           description: ID of the user who made the comment
 *           example: 1
 *         courseId:
 *           type: integer
 *           description: ID of the course being commented on
 *           example: 5
 *         star:
 *           type: integer
 *           description: Star rating for the course (1-5)
 *           example: 4
 *
 * /api/comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of comments
 *       404:
 *         description: No comments found
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Bad request
 *
 * /api/comments/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment details
 *       404:
 *         description: Comment not found
 *   patch:
 *     summary: Update a comment by ID
 *     tags: [Comments]
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
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *
 * /api/comments/search:
 *   get:
 *     summary: Search comments
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filter comments by user ID
 *       - in: query
 *         name: courseId
 *         schema:
 *           type: integer
 *         description: Filter comments by course ID
 *     responses:
 *       200:
 *         description: List of comments found
 *       404:
 *         description: No comments found
 */
