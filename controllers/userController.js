const mongoose = require('mongoose');
const User = require('../model/userModel');   

const create = async (req, res) => {           //Adds user details to DB 
    let data = new User(req.body);
    let result = await data.save();
    res.send("Data Inserted");
}

const get = async (req, res) => {             //Displays user details 
    let data = await User.find();
    res.send(data);
}

const remove = async (req, res) => {          //Removes a paricular user
    try {
        let data = await User.findOneAndDelete(req.params);
        res.send("Data Deleted");

    } catch (error) {
        res.send("Id Not Found");
        console.log(err.message);
    };

}

const update = async (req, res) => {          //Update/Change data
    try {
        let data = await User.findOneAndUpdate(req.params,      //Condition for update
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

module.exports = {
    create,
    get,
    remove,
    update
}