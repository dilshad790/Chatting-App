const express=require("express");
const app=express();
const http=require("http");
const PORT=process.env.PORT || 8000;
const server=http.createServer(app);
const path=require("path");
const { message } = require("prompt");
const {Server}  = require("socket.io");

const io=new Server(server);

//handle  socket(client) 

io.on("connection",(socket)=>{
    console.log("A new user Connected",socket.id);
  
    // sending msg from server to all socket
    
    // socket.on("user-msg",(msg)=>{
    //     console.log("message:",msg);
    //     io.emit('chat-msg',msg)
    // })

    // sending msg from servet to all socket except sender
    // socket.on('user-msg',(msg)=>{
    //     socket.broadcast.emit('chat-msg',msg)

    // })

    // set username 
    socket.on('setUsername',(username)=>{
        socket.username=username;
        console.log("Username set",username);
        
    })

    // Handle sending msg
    socket.on("user-msg",(msg)=>{
        const data={
            username:socket.username || 'Anonymous',
            message:msg,
        }
        io.emit('chat-msg',data)
    })

     socket.on("disconnect",()=>{
        console.log("User disconnected");
        
    })


})


// handle http request
app.use(express.static(path.resolve("./public")))

app.get('/',(req,res)=>{
    return res.sendFile(path.resolve("./public/home.html"))
})


server.listen(PORT,()=>{
    console.log("Server running at",PORT)
    
})


