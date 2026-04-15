const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  projectId: String,
  senderId: String,
  text: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Message", messageSchema);