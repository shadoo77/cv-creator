const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema

const TemplateSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  imgSrc: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("templates", TemplateSchema);
