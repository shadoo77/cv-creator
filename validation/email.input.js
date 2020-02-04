const isEmpty = require("../services/isEmpty");
const Joi = require("@hapi/joi");

module.exports = data => {
  let errors = {};

  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] }
      })
      .messages({ "string.email": "Invalid email address, try again!" })
  }).options({ abortEarly: false });

  const { error } = schema.validate(data);
  if (error) {
    console.log(error);
    error.details.forEach(el => {
      errors[el.context.key] = el.message;
    });
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
