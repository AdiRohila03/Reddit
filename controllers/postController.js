const Post = require('../model/postModel');
const User = require('../model/userModel');

const create = async (req, res) => {                              //Create Post
    try {
    //Checks if the entered user_id is present if true stores user details in 'user'
    const user = await User.findOne({ _id: req.params._id });     
    const data = new Post(req.body);                             //Stores Post details from body
    const file = req.files;
    console.log(file);
    //Conversion of img files to Buffer
    for(var i=0 ; i < file.length ; i++)
    {
        data.files[i] = file[i].buffer;
    }
    data.user = user._id;                                        //Adds user_id to the post schema
    await data.save();
    res.status(200).send({ success: true, Details: data });
    } catch (err) {
        console.log(err);
        res.status(400).send({ success: false, message: err });    
    }    
}

const get = async (req, res) => {                               //Displays posts 
    let post = await Post.find().select("-files");
    res.status(200).send({ success: true, Posts: post });
}

/*const personal = async (req, res) => {                               //Displays  posts of particular user 
    const user = await User.findOne({ email: req.body.email });    // to restrict the user to see only user's post
    let post = await Post.find();
    res.status(200).send({ success: true, message: post });
}*/

const remove = async (req, res) => {          //Removes a paricular post 
    try {
        let data = await Post.findOne(req.params);         //Saves Post details to data after verifying post_id
        let postId = data.user.toString();
        let user = await User.findOne({ email: req.data.email });
        let userId = user._id.toString();
        if (postId === userId) {

            await Post.findOneAndDelete(data);
            res.status(200).send({ success: true, message: "Post Deleted" });
        } else {
            res.status(200).send({ success: false, message: "Invalid User Details" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ success: false, message: err });
    }

}

const update = async (req, res) => {          //Update post details
    try {
        let data = await Post.findOne(req.params);       //Condition for update(post_id in this case given in routes)
        let postId = data.user.toString();
        let user = await User.findOne({ email: req.data.email });
        let userId = user._id.toString();
        if (postId === userId) {
            await Post.findByIdAndUpdate(data,
            {
                $set: req.body                                 //Updated Value
            });
            res.status(200).send({ success: true, message: "Post Updated", Updated_Post: data });
        } else {
            res.status(200).send({ success: false, message: "Invalid User Details" });
        }
        } catch (err) {
        console.log(err);
        res.status(400).send({success: false, message:err});        
    }

}

const likes = async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params._id });  //Finds post using post_id from params
        post.likes++;                                             //Increases Like counter
        await post.save();
        res.status(200).send(post);
    } catch (err) {
        console.log(err);
        res.status(400).send("No Post Found!");
    }
}

const dislikes = async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params._id });
        post.dislikes++;
        await post.save();
        res.status(200).send(post);
    } catch (err) {
        console.log(err);
        res.status(400).send("No Post Found!");
    }
}

module.exports = { create, get, remove, update, likes, dislikes }