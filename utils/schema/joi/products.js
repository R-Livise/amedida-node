const joi = require('@hapi/joi');

const projectIdSchema = joi
  .string()
  .regex(/[0-9a-fA-F]{24}$/)
  .required();
const projectTagSchema = joi.array().items(joi.string().max(30));

const createProjectSchema = {
  name: joi.string().max(50).required(),
  description: joi.string().min(20).max(10000).required(),
  image: joi.string().required(),
  link: joi.string(),
  tags: projectTagSchema,
};

const updateProjetSchema = {
  name: joi.string().max(50),
  description: joi.string().min(20).max(10000),
  image: joi.string(),
  link: joi.string(),
  tags: projectTagSchema,
};

module.exports = {
  projectIdSchema,
  projectTagSchema,
  createProjectSchema,
  updateProjetSchema,
};
