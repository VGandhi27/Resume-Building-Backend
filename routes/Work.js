const express =require('express')
const router =express.Router()
const mongoose=require('mongoose')
const requireLogin=require("../middleware/requireLogin")
const Work =mongoose.model("Work")

router.post("/creatework",requireLogin,(req,res)=>{

    const {title,desc,doj,dor,skill  }=req.body
    if(!title ||!desc||!doj||!dor||!skill){
        return res.status(422).json({error:"Please add all the fields"})
    }
       req.user.password=undefined
    const post=new Work({
        title,
        desc,
        doj,
        dor,
        skill
    })
    post.save().then(result=>{
        res.json({post:result})

    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports =router