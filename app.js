require('./mongodb');
const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const uroute = require('./routes/userRoute');
const proute = require('./routes/postRoute');

//Formats the data in JSON format
app.use(express.json());
//helmet helps secure Express.js applications by setting various HTTP headers.                
app.use(helmet());
//morgan provides HTTP request which generates logs that contain information about incoming requests and their corresponding responses.                        
app.use(morgan('common'));

//User
app.use('/user', uroute.userRoute);

//Post
app.use('/post', proute.postRoute);

app.listen(5000, () => {
    console.log("The server is running at port 5000");
});