const express = require('express');
const postRoute = express();
const { create, get, remove, update, likes, dislikes } = require('../controllers/postController');
const auth = require("../middlewares/auth");
const {p_upload} = require('../middlewares/upload');

postRoute.post('/:_id', auth, p_upload, create);

postRoute.get('/', auth, get);

postRoute.patch('/:_id', auth, update);

postRoute.delete('/:_id', auth, remove);

postRoute.put('/likes/:_id', auth, likes);

postRoute.put('/dislikes/:_id', auth, dislikes);

module.exports = { postRoute };


/*
{ 
   "title": ""   ,
   "text":   ""   ,
   "created_by":"" ,
   "likes":  ,
   "dislikes":  
} 
*/