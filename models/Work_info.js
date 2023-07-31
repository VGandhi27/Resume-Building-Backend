const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const WorkSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    doj:{
        type:String,
        default:"no photo"
    },
    dor:{
        type:String,
        default:"no photo"
    },
    skill:{
        type:ObjectId,
        ref:"User"
    }

})

mongoose.model("Work",WorkSchema)