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
        res.send(error)
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
                const token=  jwt.sign({loginUser}, process.env.SECRET_KEY);
                res.send(token);
            }
        }return res.status(403).send("User doesn't exist.");
    } catch (error) {
        res.status(401).send(error);
    }
}
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
            await addItem.save()
        }
    }
    catch(err){

    }

    }
//get list of itemize schedule
module.exports.getAllItems = async function (req, res){
    try {
        const getUser = await TodoList.find({email: req.body.email})
        if(getUser){
            res.json(getUser)
            }
    } catch (error) {
        res.send(error)
    }
}
// delete a single item
module.exports.deleteItem = async function (req, res){
    try {
        const getUser = await TodoList.find({email: req.body.email})
        const addItem = new TodoList ({
            item: req.body.item,
            price: req.body.price,
            quantity: req.body.quantity
        })
        if(getUser){
            await TodoList.findOneAndRemove(addItem, (err,data) =>{
            if(err){
                console.log("List not found");
            }else{
                res.send("Item deleted.")
            }}
            )
        }
    } catch (error) {
        res.send(error)
    }
}
//delete all item
module.exports.deleteDocument = async function (req, res ){
    try {
        const findUser = await User.findOne({email: req.body.email})
        if(findUser){
            await TodoList.find({_id: findUser.id}, (err, document) =>{
                if(err){
                    res.status(400).send("No document found.")
                }else{
                    TodoList.deleteMany();
                    res.status(200).send("All documents deleted.")
                }
            })
        }
    } catch (error) {
        res.status(400).send("User not found.")
    }
}





