const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const auth = require("../middleware/auth"); // ✅ add this

// Apply (protected)
router.post("/apply", async (req, res) => {
  try {
    const app = new Application(req.body);
    await app.save();
    res.json(app);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// My applications
router.get("/my/:id", async (req, res) => {
  const apps = await Application.find({ developerId: req.params.id });
  res.json(apps);
});
router.put("/update/:id", async (req, res) => {
  const app = await Application.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(app);
});

module.exports = router;