import Joi from "joi";

const LessonPOST = Joi.object({
   link: Joi.string().required(),
   description: Joi.string().required().max(100).min(2),
   courseId: Joi.number().required(),
});

const LessonPATCH = Joi.object({
   link: Joi.string().max(100).min(3).optional(),
   description: Joi.string().optional(),
   courseId: Joi.number().optional(),
});

export { LessonPOST, LessonPATCH };
