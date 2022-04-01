const express = require("express")
const useController = require("../controller/controller")
const validateToken = require("../middleware/jwt")

const router = express.Router();
// register route
router.post("/register", useController.register);
//login route
router.post("/login", useController.login);
//add to Lits
router.post("/addToList",validateToken, useController.addToList);
// delete a single item
router.post("/deleteItem",validateToken, useController.deleteItem);
// get items
router.get("/getItem",validateToken, useController.getAllItems) ;

module.exports = router; 