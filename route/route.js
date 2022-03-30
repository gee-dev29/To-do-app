const express = require("express")
const useCcontroller = require("../controller/controller")
const validateToken = require("../middleware/jwt")

const router = express.Router()
// register route
router.post("/register", useCcontroller.register)
//login route
router.get("/login",validateToken, useCcontroller.login)
router.post("/addToList",validateToken, useCcontroller.addToList)
router.post("/deleteItem",validateToken, useCcontroller.deleteItem)
router.get("/getItem",validateToken, useCcontroller.getAllItems) 

module.exports = router; 