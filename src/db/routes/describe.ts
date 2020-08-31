import { Router } from "express";
// schema
import { User } from "../models/describe";

type typeOfUser = {
    userLineId : string,
    describe : string,
    creatDate? : string
}

const router = Router();


// $router Get api/describe/get
// @desc  返回的請求的json數據
// @accsess public
router.post("/hasDescribe",(req,res)=>{
    console.log(req.body)
    User.findOne({userLineId:req.body.userLineId})
        .then((user) => {
            if(user){
                return res.json(user);
            }else{
                return res.json("")
            }
        })
        
})
// $router Post api/Describe/post
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
    User.findOneAndDelete(req.body,{},
        function(error) {
            if (error) {
              console.log(error);
            } else {
                res.json("刪除成功");
            }
        }
    )
   

})

export default router;