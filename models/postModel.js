const mongoose = require('mongoose');

const Post = new mongoose.Schema({          //Creates Post Schema
    user: {                                          //Relates 1 user to posts
        type: mongoose.Schema.Types.ObjectId,
        ref: "userSchema",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    uploaded_on: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Array,
        default: []
    },
    files: [{
        data: Buffer,     //Saves file in Mongo DB as Binary Data
    }]
}, { timestamps: true });

const postSchema = mongoose.model("Post", Post);
module.exports = postSchema; 