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
    },
    mob: {
        type: Number,
        required: true,
       // max:10 
    },
    dob: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    posts: [                                        //Relates n posts to user
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true
        }
    ]

});

const User = mongoose.model("User", user);
module.exports = User;