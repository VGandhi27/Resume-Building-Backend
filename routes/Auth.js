const express =require('express')
const router =express.Router()
const mongoose=require('mongoose')
const User=mongoose.model("User")
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')
const { JWT_SECRET }=require("../Key")




router.post('/signup',(req,res)=>{
   const {name,email,password}=req.body
   if(!email||!password||!name){
     return res.status(422).json({error:"Please add all the Credential"})
   }
 User.findOne({email:email})
 .then((savedUser)=>{
    if(savedUser){
        return res.status(422).json({error:"User already Exists with that email"})

    }

    bcrypt.hash(password,12)
    .then(hashedpassword=>{
        const user=new User({
            email,
            password:hashedpassword,
            name
        })
        user.save()
        .then(user=>{
             res.json({message:"saved successfully"})
        })
        .catch(err=>{
            console.log(err)
        })
    
    })

   
 })
 .catch(err=>{
    console.log(err)
 })
 
})

router.post('/signin',(req,res)=>{
   
    const {email,password}=req.body
    if(!email||!password){
      return res.status(422).json({error:"Please add all the Credential"})
      
    }

    User.findOne({email:email})
   .then((savedUser)=>{
    if(!savedUser){
        return res.status(422).json({error:"Invalid Email or Password"})
    } 
    bcrypt.compare(password,savedUser.password)
    .then(doMatch=>{
        if(doMatch){
           return res.json({message:"Successfully Signed In"})
          const token=jwt.sign({_id:savedUser._id },JWT_SECRET)
         const {_id,name,email}=savedUser
          res.json({token,user:(_id,name,email)})
        
        }
        else{
            return res.status(422).json({error:"Invalid Email or Password"})

        }
    })
    .catch(err=>{
        console.log(err)
    })
   })
})
module.exports=router