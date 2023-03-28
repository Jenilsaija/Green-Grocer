const mongoose=require('mongoose')

const ConnectToMongo=()=>{
   const MongoUri="mongodb://127.0.0.1:27017/Greengrocer?directConnection=true&tls=false&readPreference=primary&appName=MongoDB" 
   mongoose.set('strictQuery', true); 
   mongoose.connect(MongoUri,()=>{
        console.log("Mongo Connect SuccessFully");
    })
}

module.exports=ConnectToMongo;