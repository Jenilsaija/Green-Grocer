const express = require("express");
const Cart = require("../Models/Cart");
const router = express.Router();


router.get("/items/:id", async(req, res) => {
  try {
    const cartitem= await Cart.find({"Userid":req.params.id});
    res.json(cartitem);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/additem",async(req, res) => {
    try {
      const newitem = {
       "Pid":req.body.Pid,
       "Userid":req.body.Userid
      }
      const cart= Cart(newitem)
        await cart.save().then(()=>{
        res.send("Item Added Successfully.");
      })
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  });

  router.delete("/removeitem/:id",async(req,res)=>{
    try {
        let cart = await Cart.find(req.params.id);
    if(!cart){
        return res.status(404).send("Product Not Found");
    }
    
    product = await Cart.deleteOne(req.params.id).then(()=>{
        res.send("Item Remove Sucessfully");
    })
      
    } catch (error) {
        res.status(500).send("Internal Server Error");
      }
  });

module.exports = router;
