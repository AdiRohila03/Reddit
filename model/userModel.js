const mongoose = require('mongoose');
const validator = require ('validator');
const bcrypt = require('bcrypt');

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

user.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(this.password, salt);  
        this.password = hashedpass;
        next();      
    } catch (error) {
        next(error);        
    }
});

const User = mongoose.model("User", user);
module.exports = User;