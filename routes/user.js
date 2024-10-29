const { Router } = require('express');
const express = require('express');
const userRouter = Router();
const { User } = require('../db');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const { z }  = require('zod');

userRouter.use(express.json());
userRouter.post("/signup",async function (req,res){
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
    await User.create({
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
userRouter.post("/signin",async function (req,res){
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

    let user = null;
    try{
    user = await User.findOne({
        username : username
    })
    if (!user) {  // Check if the user is null
        return res.status(404).json({
            error: "User not found"
        });
    }
    }
    catch (e){
        res.json({
            error : e
        })
    }

    const check = await bcrypt.compare(password, user.password);
    if(check){
        const token = jwt.sign(user._id.toString(),process.env.JWT_SECRET);
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
function userAuth(req,res,next){
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
userRouter.post("/courses",userAuth,function (req,res){
    
})

module.exports = {
    userRouter : userRouter
}