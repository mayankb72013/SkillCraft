const express = require('express');
const app = express();

const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const {  UserModel, CourseModel, AdminModel, PurchaseModel } = require('./db');

const jwt = require('jsonwebtoken');


const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');

app.use("/user",userRouter);
app.use("/course",courseRouter);
app.use("/admin",adminRouter);

async function main(){
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    app.listen(3000);
 }
 main();
