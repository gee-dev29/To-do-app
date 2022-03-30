const express = require("express")
const cors =require("cors")
const bodyparser = require("body-parser")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
require("dotenv").config()
const {success, error}  = require("consola");
const myRoute = require("./route/route")

//initialize express
const app = express()

// middleware
app.use(cors())
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

// connect to a database
mongoose.connect("mongodb+srv://Godwin:geedev29@cluster0.wsaug.mongodb.net/To-do?retryWrites=true&w=majority", {useNewUrlParser: true})
    .then((result) => success({message: 'Database connected successfully.', badge: true}))
    .catch((err) => error({message: "Database connection failed." , badge: true}))

    //
    app.use(myRoute)
    
// listen to a server
app.listen(process.env.PORT, () =>{
    success({message: `listening to a server on port =  ${process.env.PORT}`, badge: true})
})