const validator = require("validator");
const isEmpty = require("../services/isEmpty");
const Joi = require("@hapi/joi");

const validateLoginInput = data => {
  let { email, password } = data;
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
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] }
    }),
    password: Joi.string().pattern(new RegExp(passRegex))
  })
    .with("email", "password")
    .options({ abortEarly: false });

  const { error, value } = schema.validate({
    password: "dfdfd#fdf",
    email: "dfhd@kdfdjf.come"
  });
  console.log("results joi ::::::: >>>> ", error.details);

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateLoginInput;
