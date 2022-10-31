//MongoAtlas connection
require('dotenv').config();
const mongoose = require ('mongoose');

const connectionParams = 
{
useNewUrlParser: true, 
useUnifiedTopology:true, 
};

mongoose.connect( process.env.URL, async(err)=>{
        if(err) throw err;
        console.log(process.env.URL);
        console.log("conncted to db");
    }
  );
