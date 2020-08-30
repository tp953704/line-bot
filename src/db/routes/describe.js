const express = require("express");
const router = express.Router();
// const keys = require("../config/config");
// schema
const User = require("../models/describe");
// $router Get api/Describe/addDescribe
// @desc  返回的請求的json數據
// @accsess public
router.get("/get",(req,res)=>{
    User.findOne({userLineId:req.body.userLineId})
        .then((user) => {
            if(user){
                return res.json(user);
            }else{
                return res.status(400).json({userLineId:""})
            }
        })
        
})
// $router Post api/Describe/addDescribe
// @desc 返回的請求的JSON數據
// @access publce
router.post("/post",(req,res)=>{
    
    // 查詢是否擁有郵件
    User.findOne({userLineId:req.body.userLineId})
        .then((user) => {
            if(user){
                return res.json({userLineId:"此人已被標記"})
            }else{
                const newUser = new User({
                    userLineId:req.body.userLineId,
                    describe:req.body.describe
                })
                
                        newUser.save()
                                .then(user=>res.json(user))
                                .catch(err => console.log(err))
            }
        })
})
router.delete("/delete",(req,res)=>{
    User.deleteOne({userLineId:req.body.userLineId})
        .then((user) => {
            
            if(user.deletedCount>0){
                return res.json("刪除成功")
            }else{
                return res.json("刪除失敗")
            }
        })
})

module.exports = router;