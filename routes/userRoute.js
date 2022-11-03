const express = require('express');
const userRoute = express();
const {create,get,remove,update} = require('../controllers/userController');

userRoute.post('/',create);

userRoute.get('/',get);

userRoute.patch('/:_id',update);

userRoute.delete('/:_id',remove);

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