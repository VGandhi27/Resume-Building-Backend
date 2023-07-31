const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const eduSchema =new mongoose.Schema({
    school:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    study:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    skill:{
        type:String,
        required:true
    },
    activities:{
        type:String,
        required:true
    }

})

mongoose.model("Edu",eduSchema)