const express=require("express");
const app=express();
const http=require("http");
const PORT=process.env.PORT||4000;
const server=http.createServer(app);
const path=require("path");
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
    socket.on('user-msg',(msg)=>{
        socket.broadcast.emit('chat-msg',msg)

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


