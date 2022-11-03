const Post = require('../model/postModel');   
const User = require('../model/userModel'); 

const create = async (req, res) => {           //Add post's data to DB
    const user = await User.findOne({_id: req.params._id});      //Stores user_id from params

    const data = new Post(req.body);                           //Takes input from postman body
    data.user = user._id;                            //Adds user_id to the post
    await data.save();
    res.send("Post Created:");      
}

const get = async (req, res) => {             //Displays all posts 
    let data = await Post.find();
    res.send(data);
}

const remove = async (req, res) => {          //Removes a paricular post 
    try {
        let data = await Post.findByIdAndDelete(req.params);
        res.send("Post Deleted");

    } catch (error) {
        res.send("Id Not Found");
        console.log(err.message);
    };

}

const update = async (req, res) => {          //Update/Change post details
    try {
        let data = await Post.findByIdAndUpdate(req.params,      //Condition for update(post_id in this case given in routes)
            {
                $set: req.body                                 //Updated Value
            }
        );
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

module.exports = { create,get,remove,update,likes,dislikes }