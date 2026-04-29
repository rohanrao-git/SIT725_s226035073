const socket = io();
const clapBtn = document.getElementById("clapBtn");
const onlineUsersEl = document.getElementById("onlineUsers");
const totalClapsEl = document.getElementById("totalClaps");
const lastActionEl = document.getElementById("lastAction");

clapBtn.addEventListener("click", () => {
  socket.emit("clap:add");
});

socket.on("stats:update", (stats) => {
  onlineUsersEl.innerText = stats.onlineUsers;
  totalClapsEl.innerText = stats.totalClaps;
  lastActionEl.innerText = stats.lastAction;
});
