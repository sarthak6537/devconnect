const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ✅ Import FIRST
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

// ✅ THEN you can log
console.log("userRoutes:", userRoutes);
console.log("projectRoutes:", projectRoutes);
console.log("applicationRoutes:", applicationRoutes);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/application", applicationRoutes);

// DB connect
mongoose.connect("YOUR_MONGO_URL")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Server
app.listen(5000, () => {
  console.log("Server running on 5000");
});