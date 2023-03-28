const mongoose=require("mongoose")
const {Schema}=mongoose;

const Ordersschema=Schema({
    Oid:{
        type:String,
        required:true,
    },
    Userid:{
        type:String,
        required:true
    },
    Pid:{
        type:String,
        required:true
    },
    Orderquantity:{
        type:Number,
        default:1
    },
    Payusing:{
        type:String      
    },
    Paysatus:{
        type:String,
        required:true,
        default:"panding"
    },
    Orderdate:{
        type:String,
        defult:Date.now(),
    },
    Price:{
        type:Number,
        default:0,
        required:true,
    }

})

module.exports=mongoose.model("Address",Ordersschema);