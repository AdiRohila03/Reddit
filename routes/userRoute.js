const mongoose = require('mongoose');
const express = require('express');
const userRoute = express();
const userController = require('../controllers/userController');

userRoute.post('/create', userController.create);

userRoute.get('/detail', userController.get);

userRoute.put('/update/:_id', userController.update);

userRoute.delete('/delete/:_id', userController.remove);

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