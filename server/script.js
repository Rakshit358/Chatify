import express from "express";
// import { chats } from "./data";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoute.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { Server } from "socket.io";

const port = process.env.PORT || 5000;
dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
  },
});

io.on("connection", (socket) => {
  // console.log(socket);
  console.log("Connected successfully");
  var userId;
  socket.on("setup", (userData) => {
    socket.join(userData);
    userId = userData;
    console.log(`user with id ${userData} joined`);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    console.log("Inside join chat");
    console.log(room);
    socket.join(room);
    console.log(`User joined the room ${room}`);
  });

  socket.on("new message", (newMessageReceived) => {
    console.log("INside new message socket");
    console.log(newMessageReceived);
    var chat = newMessageReceived.chat;
    if (!chat) return console.log("chat not defined");

    socket
      .in(newMessageReceived.chat)
      .emit("message received", newMessageReceived.content);
    // chat.users.forEach((user) => {
    //   if (user._id === newMessageReceived.sender._id) return;
    //   socket.in(user._id).emit("message received", newMessageReceived);
    // });
  });
});
