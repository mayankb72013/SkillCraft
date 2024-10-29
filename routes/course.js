const express = require('express');
const router = express.Router;
const courseRouter = router();
const { Course } = require('../db');

const { z } = require('zod');

courseRouter.post("/viewAll",function (req,res){
    
})
const { userAuth } = require('../middlewares/user');
courseRouter.post("/purchase",userAuth,function (req,res){
    
})

const { adminAuth } = require('../middlewares/admin');
courseRouter.post("/create",adminAuth,async function (req,res){
     const creatorId = req.creatorId;
     const title = req.body.title;
     const description = req.body.description;
     const price = req.body.price;
     const imageUrl = req.body.imageUrl;

     const inputValidation = z.object({
        title : z.string(),
        description : z.string(),
        price : z.number(),
        imageUrl : z.string().url()
    })
    const inputProcessedWithSuccess = inputValidation.safeParse(req.body);
    if(!inputProcessedWithSuccess.success){
        res.json({
            error : inputProcessedWithSuccess.error.issues
        })
        return ;
    }
    try{
     const course = await Course.create({
         title : title,
         description : description,
         price : price,
         imageUrl : imageUrl,
         creatorId : creatorId
     })
    }
    catch (e){
        res.json({
            error : e
        })
    }

    res.json({
       msg : "Course has been added"    
    })
})
courseRouter.put("/edit",adminAuth,function (req,res){

})
courseRouter.delete("/delete",adminAuth,function (req,res){

})

module.exports = {
    courseRouter : courseRouter
}