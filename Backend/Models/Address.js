const mongoose=require("mongoose")
const {Schema}=mongoose;

const addressschema=Schema({
    aid:{
        type:String,
        required:true,
    },
    Userid:{
        type:String,
        required:true
    },
    AddressLine1:{
        type:String,
        required:true
    },
    AddressLine2:{
        type:String,
        required:true
    },
    Zipcode:{
        type:Number,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("Address",addressschema);