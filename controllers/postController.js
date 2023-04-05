const postSchema = require('../models/postModel');
const userSchema = require('../models/userModel');

//CREATE
const create = async (req, res) => {
    if (req.user.id === req.params._id || req.user.isAdmin) {
        try {
            const postUser = await userSchema.findOne({ _id: req.params._id });
            const data = new postSchema(req.body);                             //Stores Post details from body
            data.user = postUser._id;                                        //Adds user_id to the post schema
            await data.save().then(() =>
                res.status(201).send({ message: "Post Created", Post: data })
            ).catch((err) => {
                res.status(500).json(err);
                console.log(err);
            });
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    }
    else {
        res.status(403).json("Allowed to add post only to your account");
    }
}

//UPDATE
const update = async (req, res) => {
    let data = await postSchema.findById(req.params._id);
    let userId = data.user.toString();
    if (req.user.id === userId || req.user.isAdmin) {
        try {
            await data.updateOne(
                {
                    $set: req.body
                });
            res.status(200).send({ success: true, message: "Post Updated", Updated_Post: data });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("Allowed to update only your post");
    }
}

//DELETE
const remove = async (req, res) => {
    try {
        const data = await postSchema.findById(req.params._id);
        const userId = data.user.toString();
        if (req.user.id === userId || req.user.isAdmin) {
            try {
                await postSchema.findByIdAndDelete(req.params._id);
                res.status(200).send({ success: true, message: "Post Deleted" });
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        }
        else {
            res.status(403).json("Allowed to delete only your post");
        }
    } catch (err) {
        res.status(500).json({ message: "Post Not Found", Error: err });
    }

}

//LIKE
const likes = async (req, res) => {
    try {
        const post = await postSchema.findById(req.params._id);
        if (post) {
            if (!post.likes.includes(req.user.id)) {
                await post.updateOne({ $push: { likes: req.user.id } });
                res.status(200).json(`Post Liked`);
            } else {
                res.status(403).json(`Already Liked`);
            }
        } else {
            res.status(500).send("Post Not Found");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

//DISLIKE
const dislikes = async (req, res) => {
    try {
        const post = await postSchema.findById(req.params._id);
        if (post) {
            if (post.likes.includes(req.user.id)) {
                await post.updateOne({ $pull: { likes: req.user.id } });
                res.status(200).json(`Post Disliked`);
            } else {
                res.status(403).json(`Post not liked`);
            }
        } else {
            res.status(500).send("Post Not Found");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET
const get = async (req, res) => {
    try {
        const post = await postSchema.findById(req.params._id);
        res.status(200).send({ success: true, Post: post });
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET USRE'S POSTS
const all = async (req, res) => {
    try {
        const currentUser = await userSchema.findById(req.user.id);
        const userPosts = await postSchema.find({ user: currentUser._id });
        res.status(200).send({ success: true, Post: userPosts });
    } catch (err) {
        res.status(500).json(err);
    }
}

//POST TIMELINE
const timeline = async (req, res) => {
    try {
        const currentUser = await userSchema.findById(req.user.id);
        const userPosts = await postSchema.find({ user: currentUser._id });
        const friendPosts = await Promise.all(
            //Promise.all() to fetch posts from all the friends of a current user.
            //Promise.all() allows you to wait for multiple promises to be resolved at the same time and get the results back as an array.
            currentUser.following.map((friendId) => {
                //map() method is used to loop through the array and return an array of promises.
                //map() method allows you to take each item in the array, do something with it, and store the results in a new array.
                return postSchema.find({ user: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { create, update, remove, likes, dislikes, get, all, timeline }