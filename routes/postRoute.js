const mongoose = require('mongoose');
const express = require('express');
const postRoute = express();
const postController = require('../controllers/postController');

postRoute.post('/create/:_id', postController.create);

postRoute.get('/detail', postController.get);

postRoute.put('/update/:_id', postController.update);

postRoute.delete('/delete/:_id', postController.remove);

postRoute.put('/likes/:_id', postController.likes);

postRoute.put('/dislikes/:_id', postController.dislikes);

module.exports = {postRoute}; 


/*
{ 
   "title": ""   ,
   "text":   ""   ,
   "created_by":""   ,
   "uploaded_on": "" ,
   "likes":  ,
   "dislikes":  
} 
*/   