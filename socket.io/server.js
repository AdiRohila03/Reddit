//Before Compiling enter to socket.io folder
require('dotenv').config();
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
require('./client');
const io = require('socket.io')(3000 , {  //3000 is the port where client is running
    cors:{
        origin:["http://localhost:5000" ]  //port of the server
    }
});

io.use(async(socket , next)=>{
    const token = socket.handshake.headers.authorization;
    if(!token){
        next(new Error ("Unauthorized User !"));
    }else{
        const detail = jwt.verify(token , process.env.KEY)
        const user = await User.findById({_id : detail._id})
        if(user){
            socket.UserName = user.UserName;
            console.log(socket.UserName);
            next();
        }
        else{
            next(new Error("You are not authorized"));
        }
       
    }
});

//function that runs whenever a client connects to the server & gives a socket instance
io.on('connection' , socket =>{
    console.log(socket.id);       //random id assigned to each client after the connection
    //listening to event sent by the client
    socket.on("send-message" , (message , room) =>{
        if(room === ''){
            //"broadcast" prevents sending of msg to current server i.e to itself
            socket.broadcast.emits("recieve-message"  , message)
        }else{
            socket.to(room).emits("recieve-message"  , message)
        }
    })
    socket.on('join-room' , room =>{
        socket.join(room)
        console.log(socket.Username+"joined room"+room);
    })
});