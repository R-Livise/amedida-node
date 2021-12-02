const joi = require('@hapi/joi');

const projectIdSchema = joi
  .string()
  .regex(/[0-9a-fA-F]{24}$/)
  .required();
const projectTagSchema = joi.array().items(joi.string().max(30));

const createProjectSchema = {
  username: joi.string().min(6).max(100).required(),
  password: joi.string().min(6).max(30).required(),
  email: joi
    .string()
    .regex(/\w+@\w+.\w+/)
    .max(150)
    .required(),
  isAdmin: joi.boolean(),
  isMarker: joi.boolean(),
  isClient: joi.boolean(),
};

const updateProjetSchema = {
  username: joi.string().min(6).max(100).required(),
  password: joi.string().min(8).max(30).required(),
  email: joi
    .string()
    .regex(/\w+@\w+.\w+/)
    .max(150)
    .required(),
  isAdmin: joi.boolean(),
  isMarker: joi.boolean(),
  isClient: joi.boolean(),
};

module.exports = {
  projectIdSchema,
  projectTagSchema,
  createProjectSchema,
  updateProjetSchema,
};
