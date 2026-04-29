const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;
let onlineUsers = 0;
let totalClaps = 0;

app.use(express.static("public"));

io.on("connection", (socket) => {
  onlineUsers += 1;
  console.log(`user connected: ${socket.id}`);

  io.emit("stats:update", {
    onlineUsers,
    totalClaps,
    lastAction: "A user joined",
  });

  socket.on("clap:add", () => {
    totalClaps += 1;
    io.emit("stats:update", {
      onlineUsers,
      totalClaps,
      lastAction: `Clap added by ${socket.id.slice(0, 5)}`,
    });
  });

  socket.on("disconnect", () => {
    onlineUsers -= 1;
    console.log(`user disconnected: ${socket.id}`);
    io.emit("stats:update", {
      onlineUsers,
      totalClaps,
      lastAction: "A user left",
    });
  });
});

http.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
