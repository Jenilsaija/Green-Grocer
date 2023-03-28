const mongoose=require("mongoose")
const {Schema}=mongoose;

const productschema=Schema({
    Pname:{
        type:String,
        required:true,
        default:"Unknown"
    },
    Pcategory:{
        type:String,
        required:true,
        default:"General"
    },
    Pdescription:{
        type:String,
        required:true,
        default:"Don't Provide by Seller."
    },
    Price:{
        type:Number,
        required:true,
        default:0
    },
    Availableunits:{
        type:Number,
        required:true,
        default:0
    },
    Pimage:{
        type:String,
        required:true,
        default:"imageuri"
    },
})

module.exports=mongoose.model("Product",productschema);