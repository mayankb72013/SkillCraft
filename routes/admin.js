const { Router } = require('express');
const adminRouter = Router();

adminRouter.post("/signup",function(req,res){
    
})
adminRouter.post("/signin",function(req,res){
    
})
function auth(req,res,next){

}
adminRouter.use(auth);
adminRouter.post("/course/create",function (req,res){

})
adminRouter.put("/course/edit",function (req,res){

})
adminRouter.delete("/course/delete",function (req,res){

})

module.exports = {
    adminRouter : adminRouter
}