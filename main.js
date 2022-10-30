require ('./mongodb');                      //Connects to DB
const express = require ('express');
const main = express();
const uroute = require ('./routes/userRoute')
const proute = require ('./routes/postRoute')  
main.use(express.json());                   //Formats the data in JSON format

//User
main.use('/user',uroute.userRoute);

//Post
main.use('/post',proute.postRoute);

main.listen (5000,()=>{
    console.log("The server is running at port 5000");
});