const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const Message = require("./models/Message");


// ✅ Routes
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const server = http.createServer(app);

// ✅ SOCKET SETUP
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", async (data) => {
    try {
      // ✅ SAVE TO DB
      const newMsg = new Message(data);
      await newMsg.save();

      // ✅ SEND TO ALL
      io.emit("receiveMessage", newMsg);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/application", applicationRoutes);
app.use("/message", messageRoutes);

// ✅ DB CONNECT
mongoose.connect("mongodb+srv://<devconnect>:<dev123>@sarthak.avwe2.mongodb.net/?appName=devconnect")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// ✅ PORT FIX (IMPORTANT for Render)
const PORT = process.env.PORT || 5000;

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});