const express = require('express');
const postRoute = express();
const {create,get,remove,update,likes,dislikes} = require('../controllers/postController');

postRoute.post('/:_id',create);

postRoute.get('/',get);

postRoute.patch('/:_id',update);

postRoute.delete('/:_id',remove);

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