const jwt = require("jsonwebtoken");
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized Token Provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Token not found" });
    }

    //if found
    try {

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.authUser = decode;
        next();

    } catch (error) {
        console.error('authentication error', error)
    }

}

module.exports = authMiddleware;