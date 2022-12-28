const express = require('express');
const userRoute = express();
const {login,create,get,remove,update} = require('../controllers/userController');
const auth = require('../middlewares/auth');
const {u_upload} = require('../middlewares/upload');

userRoute.post('/login',login);

userRoute.post('/',u_upload,create);

userRoute.get('/',auth,get);

userRoute.patch('/:_id',auth,update);

userRoute.delete('/:_id',auth,remove);

module.exports = {userRoute};


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