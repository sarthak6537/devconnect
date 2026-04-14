const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  projectId: String,
  developerId: String,
  message: String
});

module.exports = mongoose.model("Application", applicationSchema);