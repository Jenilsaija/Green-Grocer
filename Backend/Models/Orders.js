const mongoose=require("mongoose")
const {Schema}=mongoose;

const Ordersschema=Schema({
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
    Paymentdetails:{
        default:{}
    },
    Orderdate:{
        type:Date,
        default:Date.now(),
    },
    TotalAmount:{
        type:Number,
        default:0,
    }

})
module.exports=mongoose.model("Order",Ordersschema);