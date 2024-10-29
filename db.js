const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const UserSchema = new Schema({
     email : {type : String,unique : true},
     username : {type : String,unique : true},
     password : String
})
const CourseSchema = new Schema({
    title : {type : String,unique : true},
    description : String,
    price : Number,
    imageUrl: String,
    creatorId : objectId
})

const AdminSchema = new Schema({
    email : {type : String,unique : true},
    username : {type : String,unique : true},
    password : String
})
const PurchaseSchema = new Schema({
    course : [],
    userId : objectId
})

const UserModel = mongoose.model('users',UserSchema);
const CourseModel = mongoose.model('courses',CourseSchema);
const AdminModel = mongoose.model('admins',AdminSchema);
const PurchaseModel = mongoose.model('purchases',PurchaseSchema);

module.exports = {
    User : UserModel,
    Course : CourseModel,
    Admin : AdminModel,
    Purchase : PurchaseModel
}
