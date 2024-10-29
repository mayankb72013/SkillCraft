const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function userAuth(req,res,next){
    const token = req.headers.token;

    const UserId = jwt.verify(token,process.env.JWT_SECRET_USER);
    if(UserId){
        next();
    }
    else{
        res.json({
            msg : "Invalid Token"
        })
    }
}

module.exports = {
    userAuth
}