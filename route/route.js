const express = require("express")
const useCcontroller = require("../controller/controller")


const router = express.Router()
// register route
router.post("/register", useCcontroller.register)
//login route
router.post("/login",validateToken, useCcontroller.login)
router.post("/addToList",validateToken, useCcontroller.addToList)
router.post("/deleteItem",validateToken, useCcontroller.deleteItem)
router.post("/getItem",validateToken, useCcontroller.getAllItems)
