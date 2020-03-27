const isEmpty = require("../services/isEmpty");
const Joi = require("@hapi/joi");

// Forget password validation
const validateForgetPassowrd = data => {
  let errors = {};
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] }
      })
      .required()
      .messages({ "string.email": "Invalid email address, try again!" })
  }).options({ abortEarly: false });

  const { error } = schema.validate(data);
  if (error) {
    error.details.forEach(el => {
      errors[el.context.key] = el.message;
    });
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

// Reset password validation
const validateResetPassowrd = ({ newPassword, confirmNewPassword }) => {
  const passRegex = /^(?=.*d)(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
  let errors = {};
  const schema = Joi.object({
    newPassword: Joi.string()
      .pattern(new RegExp(passRegex))
      .required()
      .messages({ "string.pattern.base": "invalid password!" }),
    confirmNewPassword: Joi.any()
      .valid(Joi.ref("newPassword"))
      .required()
      .messages({ "any.only": "Confirm password doesn't match password!" })
    //.options({ language: { any: { allowOnly: "must match password" } } })
  }).options({ abortEarly: false });

  const { error } = schema.validate({ newPassword, confirmNewPassword });
  if (error) {
    error.details.forEach(el => {
      errors[el.context.key] = el.message;
    });
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = { validateForgetPassowrd, validateResetPassowrd };
