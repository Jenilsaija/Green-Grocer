const cors=require('cors');
const ConnectToMongo=require('./db');
const express=require('express')
const app=express()
ConnectToMongo();
const port=4000;

app.use(cors())
app.use(express.json());


app.use("/api/auth/",require("./routes/auth.js"));
app.use("/api/product/",require("./routes/Product.js"));
app.use("/api/cart/",require("./routes/cart.js"));
app.use("/api/order/",require("./routes/Order.js"));


app.listen(port,()=>{
    console.log("your Server is running on http://localhost:4000/")
})