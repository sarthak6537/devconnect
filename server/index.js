const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const Message = require("./models/Message");

// Routes
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const server = http.createServer(app);

// ✅ FIXED SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", async (data) => {
    try {
      const newMsg = new Message(data);
      await newMsg.save();

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

// ✅ FIXED MONGODB
mongoose.connect(
  "mongodb+srv://devconnect:dev123@sarthak.avwe2.mongodb.net/devconnect?retryWrites=true&w=majority"
)
.then(() => console.log("DB Connected"))
.catch(err => console.log("DB ERROR:", err));

// Test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// PORT
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});