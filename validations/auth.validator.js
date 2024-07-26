const Joi = require("joi");

const loginBodyValidatorSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { loginBodyValidatorSchema };
