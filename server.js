import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});





io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //send and get message
  socket.on("sendMessage", (data) => {
    io.emit("getMessage", data);
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
  });
});

httpServer.listen(5000);

