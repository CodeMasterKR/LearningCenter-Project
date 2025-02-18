import Joi from "joi";

const CommentPOST = Joi.object({
   message: Joi.string().max(100).min(3).required(),
   userId: Joi.number().required(),
   courseId: Joi.number().required(),
   star: Joi.number().required(),
});

const CommentPATCH = Joi.object({
   message: Joi.string().max(100).min(3).optional(),
   userId: Joi.number().optional(),
   courseId: Joi.number().optional(),
   star: Joi.number().optional(),
});

export { CommentPOST, CommentPATCH };
