const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Method to create JWT Token
const creat_token = async (Email) => {
    try {
        const token = await jwt.sign({ email: Email }, process.env.KEY);  //Creates JWT Token using Email as params
        return token;
    } catch (err) {
        res.status(400).send(err.message);
    }
}

//Authentication via email paired with password
const login = async (req, res) => {
    try {
        //Checks if the entered email is present if true saves user details in 'data'
        const data = await User.findOne({ email: req.body.email });
        if (data) {
            //Checks if the password enterd is correct
            const pass = await bcrypt.compare(req.body.password, data.password);
            if (pass) {
                const tokendata = await creat_token(req.body.email);     //Calls create_token method
                res.status(200).send({ success: true, messsage: "Succesfully Logged In Token generated: ", token: tokendata });
            }
            else {
                res.status(200).send({ success: false, msg: "Login details are Incorrect" });
            }

        } else {
            res.status(200).send({ success: false, msg: "Login details are Incorrect" });

        }

    } catch (err) {
        console.log(err);
        res.status(400).send({ success: false, messsage: err });
    }

}

const create = async (req, res) => {           //Adds user details to DB 
    let data = new User(req.body);
    await data.save();
    res.status(200).send({ success: true, message: "Data Inserted" });
}

const get = async (req, res) => {             //Displays user details 
    let data = await User.findOne({ email: req.data.email });
    res.status(200).send(data);
}

const remove = async (req, res) => {          //Removes a paricular user
    try {
        let data = await User.findByIdAndDelete(req.params);
        res.send("Data Deleted");

    } catch (error) {
        res.send("Id Not Found");
        console.log(err.message);
    };

}

const update = async (req, res) => {          //Update/Change data
    try {
        let data = await User.findByIdAndUpdate(req.params,      //Condition for update
            {
                $set: req.body                                 //Updated Value
            }
        );
        res.send(data);
    } catch (err) {
        res.send("Id Not Found");
        console.log(err.message);
    }

}

module.exports = { login, create, get, remove, update }