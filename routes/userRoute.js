const mongoose = require('mongoose');
const express = require('express');
const userRoute = express();
const {create,get,remove,update} = require('../controllers/userController');

userRoute.post('/create',create);

userRoute.get('/detail',get);

userRoute.put('/update/:_id',update);

userRoute.delete('/delete/:_id',remove);

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