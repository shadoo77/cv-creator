const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const ResetPassword = require("../models/Reset.Password");
const User = require("../models/User");
const validateEmailInput = require("../validation/email.input");
const { mailTemplates } = require("../services/config");
const sendEmail = require("../services/emailServices");

// @route  POST api/account/forgot-password
// @desc   Forgot password
// @access Public
router.post("/forget-password", async (req, res) => {
  const { email } = req.body;
  const { errors, isValid } = validateEmailInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      // Could not find email, but always give
      // ambiguous feedback when authenticating"
      errors.notFound =
        "This email is not registered, make sure that you are using the right e-mail address and try again.";
      return res.status(400).json(errors);
    }
    const token = crypto.randomBytes(20).toString("hex");
    const expires = Date.now() + 3600000;
    ///// Go to rest password document and looking for this user
    const person = await ResetPassword.findOne({ user: user._id });
    if (person) {
      // Update
      ResetPassword.findOneAndUpdate(
        { user: user._id },
        { $set: { token, expires } },
        { new: true },
        (err, doc) => {
          if (err) return res.status(404).json(err);
        }
      );
    } else {
      // Create
      new ResetPassword({
        user: user._id,
        token,
        expires
      }).save(err => {
        if (err) return res.status(404).json(err);
      });
    }
    ////////////////////////////////////////////////////////////
    const resetMail = {
      from: "kleurrijker.test@gmail.com",
      to: user.email,
      subject: "Forget password",
      userName: `${user.firstName} ${user.lastName}`,
      token,
      template: mailTemplates.PASSWOR_RESET
    };
    sendEmail(resetMail, (err, response) => {
      if (err) {
        console.error("there was an error: ", err);
        errors.notFound =
          "There is something wrong in the server, please try again later.";
        return res.status(404).json(errors);
      } else {
        console.error("successful response : ", response);
        const success = `The message has sent to ${user.email}, you can follow there the instructions to reset your password .`;
        return res.status(200).json({ success });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
});

// @route  GET api/account/reset-password
// @desc   Reset password
// @access Public
router.get("/reset-password", (req, res) => {
  let errors = {};
  ResetPassword.findOne({
    token: req.query.resetPasswordToken
  })
    .populate({
      path: "user",
      model: "account"
    })
    .exec()
    .then(field => {
      if (!field) {
        errors.invalid = "Password reset link is invalid or has expired!";
        return res.status(403).json(errors);
      }
      if (field.expires <= Date.now()) {
        errors.invalid = "Password reset link is invalid or has expired!";
        return res.status(403).json(errors);
      }
      res.status(200).json({
        userID: field.user._id,
        name: field.user.name
      });
    })
    .catch(err => {
      return res.status(404).json(err);
    });
});

// @route  POST api/account/reset-password
// @desc   Reset password
// @access Public
router.post("/reset-password", (req, res) => {
  const { id, newPassword } = req.body;
  // Call validation function
  const { errors, isValid } = validateResetPassword(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Account.findById(id)
    .then(user => {
      if (!user) {
        errors.notFound = "Helaas wij hebben uw account niet gevonden!";
        return res.status(404).json(errors);
      }

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
          if (err) throw err;
          user.account.password = hash;
          user
            .save()
            .then(() =>
              res.status(200).json({
                success:
                  "Super! Uw wachtwoord is gewijzigd , u kunt nu inloggen met uw nieuwe wachtwoord"
              })
            )
            .catch(err => res.status(404).json(err));
        });
      });
    })
    .catch(err => {
      return res.status(404).json(err);
    });
});

module.exports = router;
