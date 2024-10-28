const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://balmoorimayank:g0M5rOQ5CqgYUgpF@cluster0.u1quk.mongodb.net/SKILLCRAFT");

const jwt = require('jsonwebtoken');
const JWT_SECRET = "sodinrlwnmamipsOSDNFSLENFOSD1 23102934832095@#$%^&*&^";

// User-side
app.get("/",function (req,res){

})

app.post("/signup",function (req,res){
    
})
app.post("/signin",function (req,res){

})

function userAuth(req,res,next){
    
}
app.post("/courses",userAuth,function (req,res){
    
})
app.post("/purchaseCourse",userAuth,function (req,res){
    
})
app.post("/usersCourses",userAuth,function (req,res){
    
})

//Admin side
app.post("/adminSignup",function(req,res){
    
})
app.post("/adminSignin",function(req,res){
    
})

function adminAuth(){

}

app.post("/createCourse",adminAuth,function(req,res){

})
app.post("/addCourseContent",adminAuth,function(req,res){

})
app.delete("/deleteCourse",adminAuth,function (req,res){

})
app.listen(3000);