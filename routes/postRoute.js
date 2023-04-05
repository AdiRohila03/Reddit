const express = require('express');
const postRoute = express();
const { create, update, remove, likes, dislikes, get, all, timeline } = require('../controllers/postController');
const auth = require("../middlewares/auth");
//const { p_upload } = require('../middlewares/upload');

postRoute.post('/:_id', auth, create);

postRoute.patch('/:_id', auth, update);

postRoute.delete('/:_id', auth, remove);

postRoute.patch('/likes/:_id', auth, likes);

postRoute.patch('/dislikes/:_id', auth, dislikes);

postRoute.get('/:_id', auth, get);

postRoute.get('/profile/userPosts', auth, all);

postRoute.get('/all/timeline', auth, timeline);

module.exports = { postRoute };


/*
{ 
   "title": ""   ,
   "text":   ""      
} 
*/