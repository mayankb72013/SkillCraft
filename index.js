const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://balmoorimayank:g0M5rOQ5CqgYUgpF@cluster0.u1quk.mongodb.net/SKILLCRAFT");

const jwt = require('jsonwebtoken');
const JWT_SECRET = "sodinrlwnmamipsOSDNFSLENFOSD1 23102934832095@#$%^&*&^";

const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');

// User-side

app.user("/user",userRouter);
app.user("/course",courseRouter);

app.get("/",function (req,res){

})



function userAuth(req,res,next){
    
}




app.listen(3000);