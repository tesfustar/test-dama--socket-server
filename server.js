import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ["https://dama-game-socketio.vercel.app","https://dama-blue.vercel.app"],
  },
});





io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");
 io.emit("wel","you are now connected")
  //send and get message
  socket.on("sendMessage", (data) => {
    io.emit("getMessage", data);
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
  });
});
const PORT = process.env.PORT || 7744;
httpServer.listen(PORT);

