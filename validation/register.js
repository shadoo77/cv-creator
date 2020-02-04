const validator = require("validator");
const isEmpty = require("../services/isEmpty");

const validateRegisterInput = data => {
  let { firstName, lastName, email, password, confirmPassword } = data;
  let errors = {};

  firstName = !isEmpty(firstName) ? firstName : "";
  lastName = !isEmpty(lastName) ? lastName : "";
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";
  confirmPassword = !isEmpty(confirmPassword) ? confirmPassword : "";

  if (!validator.isLength(firstName, { min: 3, max: 30 })) {
    errors.firstName = "First name must be between 3 and 30 characters";
  }

  if (validator.isEmpty(firstName)) {
    errors.firstName = "First name field is required!";
  }

  if (!validator.isLength(lastName, { min: 3, max: 30 })) {
    errors.lastName = "Last name must be between 3 and 30 characters";
  }

  if (validator.isEmpty(lastName)) {
    errors.lastName = "Last name field is required!";
  }

  if (validator.isEmpty(email)) {
    errors.email = "Email field is required!";
  }

  if (!validator.isEmail(email)) {
    errors.email = "Email is invalid!";
  }

  if (validator.isEmpty(password)) {
    errors.password = "Password field is required!";
  }

  if (!validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters!";
  }

  if (validator.isEmpty(confirmPassword)) {
    errors.confirmPassword = "Confirm Password field is required!";
  }

  if (!validator.equals(password, confirmPassword)) {
    errors.confirmPassword = "Passwords must match!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegisterInput;
