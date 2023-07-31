const express =require('express')
const router =express.Router()
const mongoose=require('mongoose')
const requireLogin=require("../middleware/requireLogin")
const Post =mongoose.model("Per")

router.post("/createpost",requireLogin,(req,res)=>{

    const {title,body  }=req.body
    if(!title ||!body){
        return res.status(422).json({error:"Please add all the fields"})
    }
       req.user.password=undefined
    const post=new Post({
        title,
        body,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})

    })
    .catch(err=>{
        console.log(err)
    })
})


router.get("/allpost",requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})

module.exports =router