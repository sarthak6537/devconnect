const express = require("express");
const router = express.Router();
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup
router.post("/signup", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: hashed
  });

  await user.save();
  res.json(user);
});

// Login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.json({ message: "User not found" });

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, "secretkey");

  res.json({ user, token });
});

// ✅ ADD THIS LINE (VERY IMPORTANT)
module.exports = router;