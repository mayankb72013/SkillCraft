const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function adminAuth(req,res,next){
    const token = req.headers.token;

    const UserId = jwt.verify(token,process.env.JWT_SECRET_ADMIN);
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
    adminAuth
}