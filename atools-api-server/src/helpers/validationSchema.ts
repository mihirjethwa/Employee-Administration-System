// @ts-ignore
import Joi from "@hapi/joi";

export const registerSchema = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().lowercase().required(),
  // password: Joi.string().min(2).required(),
  // mobile: Joi.number().integer().min(10).required(),
  // userType: Joi.number().integer().required(),
  // profilePic: Joi.string(),
  role: Joi.string(),
  formCompleted: Joi.boolean(),
  pageStatus: Joi.string(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).required(),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  passCode: Joi.string().required(),
  password: Joi.string().min(2).required(),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .options({ messages: { "any.only": "{{#label}} does not match" } }),
});
