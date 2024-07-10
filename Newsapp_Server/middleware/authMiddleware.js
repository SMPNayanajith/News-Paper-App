const JWT =require("jsonwebtoken");
require ('dotenv').config();

const authMiddleware =(req,res,next)=>{
    const authHeader = req.header("Authorization");
    const token = authHeader.split(" ")[1];
    if(!token)
        {
            return res.status(401).json ({error:"Token not found"});
        }

        //if found
    try{

        const decode =JWT.verify(token,process.env.JWT_SECRET   );
        req.userID = decode.userID;
        next();

    }catch(error){
        console.log(error)
    }

}

module.exports = authMiddleware;