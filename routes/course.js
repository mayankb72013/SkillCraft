const express = require('express');
const router = express.Router;
const courseRouter = router();
const { Purchase, Course } = require('../db');

const { z } = require('zod');
courseRouter.use(express.json());
courseRouter.get("/(viewAll)?", async function (req, res) {
    const courses = await Course.find();
    if (courses.length < 1) {
        res.json({
            msg: "No courses available"
        })
    }
    else {
        res.json({
            courses: courses
        })
    }
})
const { userAuth } = require('../middlewares/user');
courseRouter.post("/purchase", userAuth, async function (req, res) {
    const userId = req.UserId;
    const courseId = req.body.courseId;
    
      await Course.findOne({
        _id: courseId
    })
    
    const purchasedAlready = await Purchase.findOne({
        course: courseId,
        userId: userId
    })
    if(purchasedAlready){
        res.json({
            msg : "You've already purchased this course"
        })
    }
    else {
        await Purchase.create({
            course: courseId,
            userId: userId
        })
        res.json({
            msg: "course purchased successfully"
        })
    }
})
courseRouter.get("/purchases",userAuth,async function (req,res){
    const userId = req.UserId;

    const purchases = await Purchase.find({
        userId: userId
    })
    if (purchases.length < 1) {
        res.json({
            msg: "No courses have been purchased by you"
        })
    }
    else {
        res.json({
            courses: purchases
        })
    }
})

const { adminAuth } = require('../middlewares/admin');
const user = require('./user');
courseRouter.get("/viewCourses", adminAuth, async function (req, res) {
    const creatorId = req.creatorId;

    const courses = await Course.find({
        creatorId: creatorId
    })
    if (courses.length < 1) {
        res.json({
            msg: "No courses have been created by you"
        })
    }
    else {
        res.json({
            courses: courses
        })
    }
})
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
        await Course.create({
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
    const creatorId = req.creatorId;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const courseId = req.body.courseId;

    const inputValidation = z.object({
        title: z.string(),
        description: z.string(),
        price: z.number(),
        imageUrl: z.string().url(),
        courseId: z.string()
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
        await Course.updateOne({
            _id: courseId,
            creatorId: creatorId
        }, {
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
            msg: "No such course exists with given description"
        })
    }
    else {
        res.json({
            msg: "Course has been Edited"
        })
    }
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
    if (errorThrown) {
        res.status(502).json({
            error: "Database is down"
        })
    }
    if (!course) {
        res.status(404).json({
            error: "No such course exists"
        })
    }
    else {
        await Course.deleteOne(course);
        res.json({
            msg: "Course has been Deleted"
        })
    }

})

module.exports = {
    courseRouter: courseRouter
}