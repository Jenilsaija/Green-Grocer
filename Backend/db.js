const mongoose=require('mongoose')

const ConnectToMongo=()=>{
   const MongoUri="mongodb+srv://Jenil176:Jenil%4053645@cluster0.eluqlx3.mongodb.net/greengrocer" 
   mongoose.set('strictQuery', true); 
   mongoose.connect(MongoUri,()=>{
        console.log("Mongo Connect SuccessFully");
    })
}

module.exports=ConnectToMongo;