import verifyToken from "../middlewares/verifyToken.js";
import {rolePolice} from "../middlewares/rolePolice.js";
import { Router } from "express";
import {
   login,
   register,
   resetPassword,
   sendOTP,
   verify,
} from "../controllers/auth.controller.js";
import {
   findAll,
   findBySearch,
   findOne,
   remove,
   update,
} from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.post("/verify", verify);
userRoute.post("/send-otp", sendOTP);
userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/resetPassword", resetPassword);

userRoute.get("/search", verifyToken, rolePolice(["admin"]), findBySearch);
userRoute.get("/", verifyToken, rolePolice(["admin"]), findAll);
userRoute.get("/:id", verifyToken, rolePolice(["admin"]), findOne);
userRoute.delete("/:id", verifyToken, rolePolice(["admin"]), remove);
userRoute.patch("/:id", verifyToken, rolePolice(["admin"]), update);

export default userRoute;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: User's first name
 *         lastName:
 *           type: string
 *           description: User's last name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User's password
 *         year:
 *           type: integer
 *           description: User's birth year
 *         role:
 *           type: string
 *           enum: [student, admin, teacher]
 *           description: User's role in the system
 *         exprience:
 *           type: integer
 *           description: Experience in years (optional)
 *         image:
 *           type: string
 *           description: Profile image URL (optional)
 *
 * tags:
 *   - name: Authentication
 *     description: User authentication endpoints
 *   - name: Users
 *     description: User management endpoints (Admin only)
 *
 * /api/users/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Successfully registered
 *       409:
 *         description: User already exists
 *
 * /api/users/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *
 * /api/users/resetPassword:
 *   post:
 *     tags: [Authentication]
 *     summary: Reset user password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               otp:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated
 *       400:
 *         description: Invalid OTP or email
 *       404:
 *         description: User not found
 *
 * /api/users/send-otp:
 *   post:
 *     tags: [Authentication]
 *     summary: Send OTP to user email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       500:
 *         description: Server error
 *
 * /api/users/verify:
 *   post:
 *     tags: [Authentication]
 *     summary: Verify user OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Account activated
 *       400:
 *         description: Invalid OTP or email
 *       404:
 *         description: User not found
 *
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       404:
 *         description: No users found
 *
 * /api/users/search:
 *   get:
 *     tags: [Users]
 *     summary: Search users (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *       - in: query
 *         name: exprience
 *         schema:
 *           type: integer
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Users found
 *       404:
 *         description: No users found
 *
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by ID (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 *
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 *
 *   patch:
 *     tags: [Users]
 *     summary: Update user data (Admin only)
 *     security:
 *       - bearerAuth: []
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
 *             type: object
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Not allowed to update isActive or role
 *       404:
 *         description: User not found
 */
