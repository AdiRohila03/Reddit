const mongoose = require('mongoose');

const post = mongoose.Schema({          //Creates Post Schema
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    uploaded_on: {
        type: Date,
        default: Date.now 
    },
    likes: {
        type: Number,
        default: 0,
        required: true
    },
    dislikes: {
        type: Number,
        default: 0,
        required: true
    },
    user: {                                          //Relates 1 user to posts
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    files: [{
        data: Buffer,     //Saves file in Mongo DB as Binary Data
    }]
},{timestamps : true});

const Post = mongoose.model("Post", post);
module.exports = Post; 