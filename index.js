const express = require('express');
const app = express();


// User-side
app.get("/",function (req,res){

})

app.post("/signup",function (req,res){
    
})
app.post("/signin",function (req,res){

})
app.post("/courses",function (req,res){

})
app.post("/purchaseCourse",function (req,res){

})
app.post("/usersCourses",function (req,res){

})

//Admin side
app.post("/adminSignup",function(req,res){
    
})
app.post("/adminSignin",function(req,res){

})
app.post("/createCourse",function(req,res){

})
app.post("/addCourseContent",function(req,res){

})
app.delete("/deleteCourse",function (req,res){
    
})
app.listen(3000);