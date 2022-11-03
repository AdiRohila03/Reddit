const express = require('express');
const postRoute = express();
const {create,get,remove,update,likes,dislikes} = require('../controllers/postController');

postRoute.post('/create/:_id',create);

postRoute.get('/detail',get);

postRoute.patch('/update/:_id',update);

postRoute.delete('/delete/:_id',remove);

postRoute.put('/likes/:_id',likes);

postRoute.put('/dislikes/:_id',dislikes);

module.exports = {postRoute}; 


/*
{ 
   "title": ""   ,
   "text":   ""   ,
   "created_by":"" ,
   "likes":  ,
   "dislikes":  
} 
*/   