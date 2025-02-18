import nodemailer from "nodemailer";
import { totp } from "otplib";
import { config } from "dotenv";
config();

totp.options = { step: 300, digits: 5 };
const sekretKey = process.env.OTPKEY;

const transport = nodemailer.createTransport({
   service: "gmail",
   auth: {
      user: "ibrahimovkamronbek7@gmail.com",
      pass: "wyna uzcb pgrz vdbx",
   },
});

async function sendMail(email) {
   try {
      let otp = totp.generate(sekretKey + email);
      await transport.sendMail({
         to: email,
         subject: "One time password",
         html: `<p>Code for verify account <b>${otp}</b></p>`,
      });
   } catch (error) {
      console.log(error.message);
   }
}

export default sendMail;
