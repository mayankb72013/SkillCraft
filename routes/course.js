const express = require('express');
const router = express.Router;
const courseRouter = router();
const { Course } = require('../db');

const { z } = require('zod');

courseRouter.post("/viewAll", function (req, res) {

})
const { userAuth } = require('../middlewares/user');
courseRouter.post("/purchase", userAuth, function (req, res) {

})

const { adminAuth } = require('../middlewares/admin');
courseRouter.post("/create", adminAuth, async function (req, res) {
    const creatorId = req.creatorId;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;

    const inputValidation = z.object({
        title: z.string(),
        description: z.string(),
        price: z.number(),
        imageUrl: z.string().url()
    })
    const inputProcessedWithSuccess = inputValidation.safeParse(req.body);
    if (!inputProcessedWithSuccess.success) {
        res.json({
            error: inputProcessedWithSuccess.error.issues
        })
        return;
    }
    let errorThrown = false;
    try {
        const course = await Course.create({
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl,
            creatorId: creatorId
        })
    }
    catch (e) {
        console.log(e);
        errorThrown = true;
    }
    if (errorThrown) {
        res.status(409).json({
            msg: "A course with this title already exists"
        })
    }
    else {
        res.json({
            msg: "Course has been added"
        })
    }
})
courseRouter.put("/edit", adminAuth, async function (req, res) {

})
courseRouter.delete("/delete", adminAuth, async function (req, res) {
    const creatorId = req.creatorId;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;

    const inputValidation = z.object({
        title: z.string(),
        description: z.string(),
        price: z.number(),
        imageUrl: z.string().url()
    })
    const inputProcessedWithSuccess = inputValidation.safeParse(req.body);
    if (!inputProcessedWithSuccess.success) {
        res.json({
            error: inputProcessedWithSuccess.error.issues
        })
        return;
    }
    let course;
    let errorThrown = false;
    try {
        course = await Course.findOne({
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl,
            creatorId: creatorId
        })
    }
    catch (e) {
        console.log(e);
        errorThrown = true;
        
    }
    if(errorThrown){
        res.status(502).json({
            error : "Database is down"
        })
    }
    if (!course) {
        res.status(404).json({
            error: "No such course exists"
        })
    }
    else{
        await Course.deleteOne(course);
        res.json({
            msg: "Course has been Deleted"
        })
    }

})

module.exports = {
    courseRouter: courseRouter
}