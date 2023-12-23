const express = require('express');
const userRoute = express();
const { reg, login, update, get, remove, user, stats, follow, unfollow, friends, dp } = require('../controllers/userController');
const auth = require('../middlewares/auth');
const { u_upload } = require('../middlewares/upload')

userRoute.post('/register', u_upload, reg);

userRoute.post('/login', login);

userRoute.patch('/:_id', auth, update);

userRoute.patch('/dp/:_id', auth, u_upload, dp);

userRoute.get('/profile', auth, user);

userRoute.get('/', auth, get);

userRoute.get('/stats', auth, stats);

userRoute.get('/all/friends', auth, friends);

userRoute.delete('/:_id', auth, remove);

userRoute.patch('/follow/:_id', auth, follow);

userRoute.patch('/unfollow/:_id', auth, unfollow);

module.exports = { userRoute };

/*
{ 
   "username": ""   ,
    "email":   ""   ,
    "password":""   ,
    "mob":        ,
    "dob":     ""   ,
    "bio":     "" 
}
*/ 