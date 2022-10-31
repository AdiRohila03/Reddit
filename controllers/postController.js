const mongoose = require('mongoose');
const Post = require('../model/postModel');   
const User = require('../model/userModel'); 

const create = async (req, res) => {           //Add post's data to DB
    const user = await User.findOne({_id: req.params._id});      //Stores user_id from params

    const data = new Post();                           //Takes input from postman body
    data.title = req.body.title;
    data.text = req.body.text;
    data.created_by = req.body.created_by;
    data.uploaded_on  = req.body.uploaded_on;
    data.likes = req.body.likes;
    data.dislikes = req.body.dislikes;
    data.user = user._id;                               //Adds user_id to the post
    await data.save();
    res.send("Data Inserted:");      
}

const get = async (req, res) => {             //Displays all posts 
    let data = await Post.find();
    res.send(data);
}

const remove = async (req, res) => {          //Removes a paricular post 
    try {
        let data = await Post.findOneAndDelete(req.params);
        res.send("Data Deleted");

    } catch (error) {
        res.send("Id Not Found");
        console.log(err.message);
    };

}

const update = async (req, res) => {          //Update/Change post details
    try {
        let data = await Post.findOneAndUpdate(req.params,      //Condition for update(post_id in this case given in routes)
            {
                $set: req.body                                 //Updated Value
            }
        );
        res.send("Updated Data:");
        res.send(data);
    } catch (error) {
        res.send("Id Not Found");
        console.log(err.message);
    }

}

const likes = async (req, res) => {               
try {
    const post = await Post.findOne({_id: req.params._id});  //Finds post using post_id from params
    post.likes ++;                                          //Increases Like counter
    await post.save();
    res.send(post);
    }catch(err){
        res.send("No Post Found!");
}
}

const dislikes = async (req, res) => {   
    try {
        const post = await Post.findOne({_id: req.params._id});
        post.dislikes ++; 
        await post.save();
        res.send(post);
        }catch(err){
            res.send("No Post Found!");
    }
    }

module.exports = {
    create,
    get,
    remove,
    update,
    likes,
    dislikes
}