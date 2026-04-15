const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  projectId: String,
  developerId: String,
  message: String,
  status: {
    type: String,
    default: "pending" // pending / accepted / rejected
  }
});

module.exports = mongoose.model("Application", applicationSchema);