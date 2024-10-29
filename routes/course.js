const express = require('express');
const router = express.Router;
const courseRouter = router();

courseRouter.post("/viewAll",userAuth,function (req,res){
    
})
courseRouter.post("/purchase",userAuth,function (req,res){
    
})

module.exports = {
    courseRouter : courseRouter
}