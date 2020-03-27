const validator = require("validator");
const isEmpty = require("../services/isEmpty");
const Joi = require("@hapi/joi");

const validateLoginInput = data => {
  let errors = {};
  const passRegex = /^(?=.*d)(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;

  // email = !isEmpty(email) ? email : "";
  // password = !isEmpty(password) ? password : "";

  // if (validator.isEmpty(email)) {
  //   errors.email = "Email field is required!";
  // } else if (!validator.isEmail(email)) {
  //   errors.email = "Email is invalid!";
  // }

  // if (validator.isEmpty(password)) {
  //   errors.password = "Password field is required!";
  // }

  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] }
      })
      .required()
      .messages({ "string.email": "Invalid email address, try again!" }),
    password: Joi.string()
      .pattern(new RegExp(passRegex))
      .required()
      .messages({ "string.pattern.base": "invalid password!" })
  })
    .with("email", "password")
    .options({ abortEarly: false });

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

module.exports = validateLoginInput;
