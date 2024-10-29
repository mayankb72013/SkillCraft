const { Router } = require('express');

const router = Router();

router.post("/signup",function (req,res){
    
})
router.post("/signin",function (req,res){

})
function userAuth(req,res,next){
    
}
router.post("/courses",userAuth,function (req,res){
    
})

module.exports = {
    userRouter : router
}