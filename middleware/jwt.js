const jwt  = require("jsonwebtoken");
// const user = require("../model/user")

const validateToken = async function (req, res, next){
    try {
        const authHeader = req.headers["Bearer Token"];

        if(authHeader){
            const token = authHeader.split(" ")[1]
                await jwt.verify(token, process.env.SECRET_KEY, (err, data)=>{
                    if(err){
                        console.log("Invalid token.");
                    }else{ 
                        res.send(data);
                        next();
                    }
                });

        }else{
            console.log("token doesn't exist");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = validateToken;