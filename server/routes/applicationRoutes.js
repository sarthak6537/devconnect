const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const auth = require("../middleware/auth"); // ✅ add this

// Apply (protected)
router.post("/apply", auth, async (req, res) => {
  try {
    const newApp = new Application(req.body);
    await newApp.save();
    res.json(newApp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// My applications
router.get("/my/:id", async (req, res) => {
  const apps = await Application.find({ developerId: req.params.id });
  res.json(apps);
});

module.exports = router;