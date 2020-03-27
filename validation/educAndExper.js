const isEmpty = require("../services/isEmpty");
const Joi = require("@hapi/joi");

module.exports = data => {
  const { email, password } = data;
  let errors = {};

  const schema = Joi.object({});

  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";

  if (validator.isEmpty(email)) {
    errors.email = "Email field is required!";
  } else if (!validator.isEmail(email)) {
    errors.email = "Email is invalid!";
  }

  if (validator.isEmpty(password)) {
    errors.password = "Password field is required!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
