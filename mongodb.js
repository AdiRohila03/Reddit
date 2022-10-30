//MongoAtlas connection
const mongoose = require ('mongoose');

const connectionParams = 
{
useNewUrlParser: true, 
useUnifiedTopology:true, 
};

mongoose.connect(
    "mongodb+srv://Aditya:redditunicode@cluster0.wr8qzo4.mongodb.net/Reddit?retryWrites=true&w=majority",
    async(err)=>{
        if(err) throw err;
        console.log("conncted to db")
    }
  );
