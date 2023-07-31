const express =require('express')
const router =express.Router()
const mongoose=require('mongoose')
const requireLogin=require("../middleware/requireLogin")
const Edu =mongoose.model("Edu")

router.post("/createedu",requireLogin,(req,res)=>{

    const {school,degree,study,desc,skill,activities  }=req.body
    if(!school ||!degree||!study||!desc||!skill||!activities){
        return res.status(422).json({error:"Please add all the fields"})
    }
       req.user.password=undefined
    const post=new Edu({
        school,
        degree,
        study,
        desc,
        skill,
        activities
       
    })
    post.save().then(result=>{
        res.json({post:result})

    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports =router