const jwt  = require("jsonwebtoken")
const user = require("../model/user")

module.exports.validateToken = async function (req, res, next){
    try {
        const authHeader = req.header.authorization
        if(authHeader){
            const token = authHeader.split(" ")[1]
                await jwt.verify(token, process.env.SECRET_KEY, (err, data)=>{
                    if(err){
                        console.log("Invalid token.")
                    }else{
                        res.send(data)
                        next()
                    }
                })

        }else{
            console.log("token doesn't exist")
        }
    } catch (error) {
        
    }
}