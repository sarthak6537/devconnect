const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth"); // ✅ protect routes

// ✅ 1️⃣ Create project (only logged-in user)
router.post("/create", async (req, res) => {
  try {
    console.log("BODY:", req.body); // debug

    const project = new Project({
      title: req.body.title,
      budget: req.body.budget,
      description: req.body.description,
      // ❌ REMOVE userId for now
    });

    await project.save();

    res.json(project);
  } catch (err) {
    console.log("ERROR:", err); // 👈 show error in console
    res.status(500).json({ error: err.message });
  }
});

// ✅ 2️⃣ Get all projects
router.get("/all", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 3️⃣ Get my projects (shopkeeper dashboard)
router.get("/my/:id", async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.params.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 4️⃣ Delete project
router.delete("/delete/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
