import joi from "joi";

const verifyValid = joi.object({
   email: joi.string().email().required(),
   otp: joi.string().required(),
});

const resetValid = joi.object({
   email: joi.string().email().required(),
   otp: joi.string().required(),
   newPassword: joi.string().required(),
});

const emailValid = joi.object({
   email: joi.string().email().required(),
});

const userValid = joi.object({
   firstName: joi.string().required(),
   lastName: joi.string().required(),
   email: joi.string().email().required(),
   password: joi.string().min(4).required(),
   year: joi.number().positive().min(4).required(),
   role: joi.string().required(),
   exprience: joi.number().optional(),
   image: joi.string().optional(),
});

const userPatchValid = joi.object({
   firstName: joi.string(),
   lastName: joi.string(),
   year: joi.number().positive().min(4),
   role: joi.string(),
   exprience: joi.number(),
   image: joi.string(),
   isActive: joi.boolean(),
});

const loginValid = joi.object({
   email: joi.string().email().required(),
   password: joi.string().required(),
});

export {
   userValid,
   emailValid,
   verifyValid,
   loginValid,
   resetValid,
   userPatchValid,
};
