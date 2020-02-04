const express = require("express");
const router = express.Router();
//const auth = require("../middleware/auth");

// Load User model
const Templates = require("../models/Templates");

// @route  GET api/templates
// @desc   Get all templates
// @access Public
router.get("/", async (req, res) => {
  try {
    const templates = await Templates.find({});
    if (!templates && !templates.length) {
      return res.status(400).json({ error: "No templates found!" });
    }
    return res.status(200).json(templates);
  } catch (error) {
    return res.status(404).json(error);
  }
});

module.exports = router;
