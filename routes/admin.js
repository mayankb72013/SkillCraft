const { Router } = require('express');
const express = require('express');
const adminRouter = Router();
const { Admin } = require('../db');

//bcrypt, zod, jwt
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const { z }  = require('zod');

adminRouter.use(express.json());
adminRouter.post("/signup",async function(req,res){
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const inputValidation = z.object({
        email : z.string().email(),
        username : z.string(),
        password : z.string()
    })
    const inputProcessedWithSuccess = inputValidation.safeParse(req.body);
    if(!inputProcessedWithSuccess.success){
        res.json({
            error : inputProcessedWithSuccess.error.issues
        })
        return ;
    }

    const hashedPassword = await bcrypt.hash(password,5);
    try{
    await Admin.create({
        email : email,
        username : username,
        password : hashedPassword
    })
   }
   catch (e){
      res.json({
        error : e
      })
   }
   res.json({
     msg : "You've been signed up"
   })
})
adminRouter.post("/signin",async function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    const inputValidation = z.object({
        username : z.string(),
        password : z.string()
    })
    const inputProcessedWithSuccess = inputValidation.safeParse(req.body);
    if(!inputProcessedWithSuccess.success){
        res.json({
            error : inputProcessedWithSuccess.error.issues
        })
        return ;
    }

    let User = null;
    try{
    User = await Admin.findOne({
        username : username
    })
    }
    catch (e){
        res.json({
            error : e
        })
    }

    const check = await bcrypt.compare(password, User.password);
    if(check){
        const token = jwt.sign(User._id.toString(),process.env.JWT_SECRET.toString());
        res.json({
            token : token
        })
    }
    else{
        res.status(401).json({
            error : "Invalid Credentials"
        })
    }
})
function auth(req,res,next){
    const token = req.headers.token;

    const UserId = jwt.verify(token,process.env.JWT_SECRET);
    if(UserId){
        next();
    }
    else{
        res.json({
            msg : "Invalid Token"
        })
    }
}


adminRouter.post("/course/create",auth,function (req,res){

})
adminRouter.put("/course/edit",auth,function (req,res){

})
adminRouter.delete("/course/delete",auth,function (req,res){

})

module.exports = {
    adminRouter : adminRouter
}