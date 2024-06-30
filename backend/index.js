const express = require("express");
const app = express();
const bodyparser = require("body-parser");

const port = 3000;
const port1 = 3001;
require("./db");
require("./models/User");
require("./models/Message");

const authRoutes = require("./routes/authRoutes");
const uploadMediaRoute = require("./routes/uploadMediaRoute");
const messageRoutes = require("./routes/messageRoutes");
//
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer();
const io = new Server(httpServer, {});
//
app.use(bodyparser.json());
app.use(authRoutes);
app.use(uploadMediaRoute);
app.use(messageRoutes);

app.get("/", (req, res) => {
  res.send("This is webpage check");
});

//............18
io.on("connection", (socket) => {
  console.log("USER CONNECTED - ", socket.id);

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED - ", socket.id);
  });

  socket.on("join_room", (data) => {
    //me //f   //me //f
    console.log("USER WITH ID - ", socket.id, "JOIN ROOM - ", data.roomid);
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    console.log("Message Receved - ", data);
    io.emit("receive_message", data);
  });
});

httpServer.listen(port1, () => {
  console.log(`Socketio server is running on port ${port1}`);
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
