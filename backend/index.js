const express = require('express');
const cors = require("cors");
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io")


app.use(cors());

const io = new Server(server,{
    cors:{
        origin: "http://localhost:5173"
    }
})

io.on("connection",(socket)=>{
    

    socket.on("draw",(data)=>{
      
      socket.broadcast.emit("clientDraw",{x:data.x,y:data.y});
    })

    socket.on("mouseD",(data)=>{
      socket.broadcast.emit("clientDown",{x:data.x,y:data.y});
    })

    socket.on("mouseU",(data)=>{
      socket.broadcast.emit("clientUp","false");
    })
})

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});