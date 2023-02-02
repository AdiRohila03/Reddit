const io = require('socket.io-client');

const socket = io('http://localhost:3000')  //connects to the server

//Connecting with the server
socket.on('connect' , (message , room) =>{
    console.log("Connected with ID:"+socket);

//sending events up from the client to the server 
socket.emits("send-message" , (message , room))

//joining a room   
socket.emits('join-room' , room)
 })

//listening to events coming down from server 
socket.on("recieve-message" , message =>{
    console.log(message);
    displayMessage(message);
});