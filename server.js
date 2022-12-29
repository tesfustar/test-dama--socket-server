import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "https://dama-game-socketio.vercel.app",
  },
});





io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //send and get message
  socket.on("sendMessage", (data) => {
    io.to().emit("getMessage", data);
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
  });
});
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT);

