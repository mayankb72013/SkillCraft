const express = require('express');
const router = express.Router;
const courseRouter = router();
const { Course } = require('../db');

courseRouter.post("/viewAll",function (req,res){
    
})
courseRouter.post("/purchase",function (req,res){
    
})

module.exports = {
    courseRouter : courseRouter
}