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
        type: String,
        required: true
        /*type: Date,
        default: Date.now */
    },
    likes: {
        type: Number,
        required: true
    },
    dislikes: {
        type: Number,
        required: true
    },
    user: {                                          //Relates 1 user to posts
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Post = mongoose.model("Post", post);
module.exports = Post; 