import { createServer } from "http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ["https://dama-game-socketio.vercel.app",
    "http://localhost:3000","http://192.168.0.145:3000","http://192.168.0.143:3000",
    "https://dama-blue.vercel.app","https://admin.socket.io"],
    credentials: true
  },
});





io.on("connection", (socket) => {
// console.log(socket.id)
  //user connection
  console.log("a user connected.");

   socket.on('join-room',async(room)=>{

     const clients =await io.of('/').in(room).fetchSockets()
      if(clients.length == 2 ){

        // io.to(room).emit("started","you can play now")
        io.to(socket.id).emit("roomTwo","room is filled")
      }else{
        socket.join(room)
        io.to(room).emit("private-room","you are now in private room")
      }
    //send and get message
  
    socket.on("sendMessage", (data) => {
      io.to(room).emit("getMessage", data)
    });
    socket.on("sendGameMessage", (data) => {
      io.to(room).emit("getGameMessage", data)
    });
   })

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!")
  });
});
instrument(io, {
  auth: false
});
const PORT = process.env.PORT || 7744;
httpServer.listen(PORT);

