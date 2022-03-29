const User = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const TodoList = require("../model/todoList")
const { findOneAndRemove } = require("../model/user")

module.exports.addToList = async function (req, res){

try{
        const getUser = await findOne({email: req.body.email})
        const addItem = new TodoList ({
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
        const getUser = await findOne({email: req.body.email})
        const addItem = new TodoList ({
            item: req.body.item,
            price: req.body.price,
            quantity: req.body.quantity
        })
        if(getUser){
            await addItem.save()
        }
    } catch (error) {
        res.send(error)
    }
}
module.exports.deleteItem = async function (req, res){
    try {
        const getUser = await findOne({email: req.body.email})
        const addItem = new TodoList ({
            item: req.body.item,
            price: req.body.price,
            quantity: req.body.quantity
        })
        if(getUser){
            await TodoList.findOneAndRemove(getUser.id, (err,data) =>{
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
            password: req.body.password
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
                res.json({email: req.body.email, token})
            }
        }return res.status(403).send("invalid token")
    } catch (error) {
        res.send(error)
    }
}
module.exports.update = async  function (req, res) {
    
        try {
            const salt = await bcrypt.genSalt(10);
    
            const user =  await User.findOne({email: req.body.email})
            if (user){       
                await User.findByIdAndUpdate(user.id, (err, data) =>{
                if(err) {
                    console.log(err)
                }
                return res.send(data);
                console.log("Data updated successfully.");
            });
            };
            return console.log(error)
        }catch (error) {
            console.log("Can't update user")
        }
    
}
