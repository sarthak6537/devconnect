const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Send message
router.post("/send", async (req, res) => {
  const msg = new Message(req.body);
  await msg.save();
  res.json(msg);
});

// Get messages by project
router.get("/:projectId", async (req, res) => {
  const msgs = await Message.find({ projectId: req.params.projectId });
  res.json(msgs);
});
module.exports = router;