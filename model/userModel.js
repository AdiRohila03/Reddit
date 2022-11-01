const mongoose = require('mongoose');
const validator = require ('validator');

const user = mongoose.Schema({        //Creates User Schema
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Email is Invalid!");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength:5
    },
    mob: {
        type: String,
        required: true,
        minlength:10,
        maxlength:15
    },
    dob: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    }

},{timestamps : true});

const User = mongoose.model("User", user);
module.exports = User;