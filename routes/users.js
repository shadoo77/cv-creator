const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const auth = require("../middleware/auth");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load User model
const User = require("../models/User");

// @route  GET api/users/test
// @desc   Tests users route
// @access Public
router.get("/test", (req, res) => {
  return res.status(200).json({ msg: "User works!" });
});

// @route  GET api/users/register
// @desc   Register user
// @access Public
router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ email: "Email is already existed!" });
    } else {
      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.status(200).json(user))
            .catch(err => console.log(err));
        });
      });
    }
  } catch (err) {
    return res.status(404).json(err);
  }
});

// @route  GET api/users/login
// @desc   Login user / return token
// @access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      errors.email = "User not found!";
      return res.status(404).json(errors);
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      //return res.status(200).json({ msg: 'password successed!' });
      // create web token / sign token
      const payload = {
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      };
      jwt.sign(payload, keys.secretKEY, { expiresIn: "7h" }, (err, token) => {
        if (err) throw err;
        else {
          return res.json({
            msg: "token is successful registered!",
            token: "Bearer " + token
          });
        }
      });
    } else {
      errors.password = "Password is incorrect!";
      return res.status(400).json(errors);
    }
  } catch (err) {
    return res.status(404).json(err);
  }
});

// @route  GET api/users/current
// @desc   return current user
// @access Private
router.get("/current", [auth], (req, res) => {
  return res.send({
    _id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email
  });
});

module.exports = router;
