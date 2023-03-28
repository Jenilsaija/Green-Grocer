const mongoose=require("mongoose")
const {Schema}=mongoose;

const cartschema=Schema({
    Pid:{
        type:String,
        required:true,
        default:"Unknown"
    },
    Userid:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model("Cart",cartschema);