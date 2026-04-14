const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  budget: String,
  userId: String
});

module.exports = mongoose.model("Project", projectSchema);