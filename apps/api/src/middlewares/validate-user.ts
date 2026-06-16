const Joi = require('joi');
const validate = require('./validation');

const validateLogin = validate(
  Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
);

const validateUserCreate = validate(
  Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
);

const validateProfileUpdate = validate(
  Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
);

module.exports = {
  validateLogin,
  validateUserCreate,
  validateProfileUpdate,
};

export {};
