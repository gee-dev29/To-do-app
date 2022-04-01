const User = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const TodoList = require("../model/todoList")
const todoList = require("../model/todoList")

// registration logic
module.exports.register = async function (req, res){
    try {
        // hash password
        const salt = await bcrypt.genSalt(15)
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        // collect the user data
        const userData = new User({
            email: req.body.email,
            password: hashPassword
        })
        // find a user
        const savedUser  = await User.findOne({email: req.body.password})
        if(savedUser){
            res.status(400).send("User already existed.")
        }else{
            await userData.save()
            res.status(200).send("User created successfully.")
        }
    } catch (error) {
        res.send(error);
    }
}
// log in
module.exports.login = async function (req, res) {
    try {
        const salt = await bcrypt.genSalt(15);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        //find the user
        const loginUser = await User.findOne({email: req.body.email});
        if(loginUser){
            const validateData = await bcrypt.compare(req.body.password, loginUser.password);
            if(validateData){
                // create and asign token
                const token=  jwt.sign({loginUser}, process.env.SECRET_KEY, {expiresIn: "24h"});
                res.send(token);
                
            };
        }return res.status(403).send("User doesn't exist.");
    } catch (error) {
        res.status(401).send(error);
    };
};
//add to list
module.exports.addToList = async function (req, res){

try{
        const getUser = await User.findOne({email: req.body.email})
        const addItem = new TodoList ({
            email: req.body.email,
            item: req.body.item,
            price: req.body.price,
            quantity: req.body.quantity
        })
        if(getUser){
            await addItem.save();
            res.status(201).send("Items added.");
        }

    }
    catch(err){

    }

    }
//get list of itemize schedule
module.exports.getAllItems = async function (req, res){
    try {
        const getItem = await TodoList.find({email: req.body.email});
        if(getItem){
            res.send(getItem);
            }
    } catch (error) {
        res.send("Empty.");
    };
};
// delete a single item 
module.exports.deleteItem = async function (req, res){
    try {
        const getList = await TodoList.find({email: req.body.email})
        if(getList){
            await TodoList.findOneAndRemove(getList.id);
            res.status(200).send("List delete.");
        };
    } catch (error) {
        res.status(400).send(error);
    }
}
