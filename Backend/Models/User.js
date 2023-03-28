const mongoose=require("mongoose")
const {Schema}=mongoose;

const userschema=Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Dob:{
        type:Date
    },
    Mobileno:{
        type:Number,
    }
})

module.exports=mongoose.model("User",userschema);