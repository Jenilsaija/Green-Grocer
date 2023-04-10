
const express = require("express");
const Orders = require("../Models/Orders");
const router = express.Router();


router.post("/addneworder",async(req, res) => {
    try {
      const newproduct = {
        "Userid": req.body.Userid,
        "Pid": req.body.Pid,
        "Orderquantity": req.body.Orderquantity,
        "Paymentdetails": req.body.Paymentdetails,
        "TotalAmount": req.body.TotalAmount,
      }
      const order= Orders(newproduct)
        await order.save().then(()=>{
        res.send("Order Successfully.");
      })
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  });

router.post("/userorders/:id",async(req,res)=>{
  try {
    const user = {
      "Userid": req.params.id,
    }
    const orders=await Orders.find(user);
    if (orders!==[]) {
      res.send(orders);
    }
    else{
      res.send("Please Order Something");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }

})
  
module.exports = router;