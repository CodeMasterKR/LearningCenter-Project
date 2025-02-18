import {
   emailValid,
   loginValid,
   resetValid,
   userValid,
   verifyValid,
} from "../validations/user-valid.js";
import sendMail from "../middlewares/nodemailer.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { totp } from "otplib";
import dotenv from "dotenv";

dotenv.config();
const sekretKey = process.env.OTPKEY;
const jwtKey = process.env.JWTKEY;

export async function verify(req, res) {
   try {
      let { error } = verifyValid.validate(req.body);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      let { email, otp } = req.body;
      let isValid = totp.check(otp, sekretKey + email);

      if (!isValid) {
         return res.status(400).json({ message: "OTP or email is wrong." });
      }

      let user = await User.findOne({ where: { email } });
      if (!user) {
         return res.status(404).json({ message: "Not found user" });
      }

      await user.update({ isActive: true });

      res.status(200).json({ message: "Your account is actived." });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function sendOTP(req, res) {
   try {
      let { error } = emailValid.validate(req.body);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      let { email } = req.body;
      await sendMail(email);

      res.status(200).json({
         message: "The code has been sent to your email.",
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function register(req, res) {
   try {
      let { error, value } = userValid.validate(req.body);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      let { email, password } = req.body;
      let user = await User.findOne({ where: { email } });

      if (user) {
         return res.status(409).json({ message: "User already exists." });
      }

      value.password = bcrypt.hashSync(password, 10);
      let c = await User.create(value);
      await sendMail(email);

      res.status(201).json({
         message:
            "Registered and otp has been sent to your email, activate your account.",
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function login(req, res) {
   try {
      let { error } = loginValid.validate(req.body);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      let { email, password } = req.body;
      let user = await User.findOne({ where: { email } });

      if (!user) {
         return res.status(404).json({ message: "Not found user" });
      }

      if (!user.isActive) {
         return res.status(401).json({
            message: "Your account is not active, please activate account.",
         });
      }

      let isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) {
         return res.status(400).json({ message: "Password or email wrong" });
      }

      let token = jwt.sign(
         {
            id: user.id,
            role: user.role,
         },
         jwtKey
      );

      res.status(200).json({
         message: "logined successfully.",
         token,
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function resetPassword(req, res) {
   try {
      let { error, value } = resetValid.validate(req.body);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      let { email, otp, newPassword } = value;
      let isValid = totp.check(otp, sekretKey + email);

      if (!isValid) {
         return res.status(400).json({ message: "OTP or email is wrong." });
      }

      let user = await User.findOne({ where: { email } });
      if (!user) {
         return res.status(404).json({ message: "Not found user" });
      }

      let hashpass = bcrypt.hashSync(newPassword, 10);

      await user.update({ password: hashpass });

      res.status(200).json({ message: "Password updated." });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}
