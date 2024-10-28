const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const UserSchema = new Schema({

})
const CourseSchema = new Schema({

})

const AdminSchema = new Schema({

})
const PurchaseSchema = new Schema({

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
