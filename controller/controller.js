const User = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const TodoList = require("../model/todoList")

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
module.exports.login = async function (req, res) {
    try {
      
        //find the user
        const loginUser = await User.findOne({email: req.body.email})
        if(loginUser){
            const validateData = await bcrypt.compare(req.body.password, loginUser.password)
            if(validateData){
                // create and asign token
                const token = await jwt.sign({loginUser}, process.env.SECRET_KEY)
                res.status(200).send({email: req.body.email, token})
            }
        }return res.status(403).send("invalid token")
    } catch (error) {
        res.status(401).send(error)
    }
}

