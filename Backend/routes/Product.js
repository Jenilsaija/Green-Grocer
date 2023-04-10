const express = require("express");
const Product = require("../Models/Product");
const router = express.Router();
const multer = require('multer');
let path = require('path');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage })


router.get("/allproducts", async(req, res) => {
  try {
    const product= await Product.find()
    res.json(product);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/spsearch/:id", async(req, res) => {
  try {
    const product= await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});



router.post("/addnewproduct",upload.single('Pimage'),async(req, res) => {
    try {
      const newproduct = {
        "Pname": req.body.Pname,
        "Pcategory": req.body.Pcategory,
        "Pdescription": req.body.Pdescription,
        "Price": req.body.Price,
        "Availableunits": req.body.Availableunits,
        "Pimage":"./uploads/"+ req.file.filename
      }
      const product= Product(newproduct)
        await product.save().then(()=>{
        res.send("Product Insert Successfully.");
      })
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  });

  router.put("/updateproduct/:id",upload.single("Pimage"),async(req, res) => {
    const {Pname,Pcategory,Pdescription,Price,Availableunits}=req.body;
    try {
      const updateproduct = {};
    if (Pname) {updateproduct.Pname = Pname;}
    if (Pcategory) {updateproduct.Pcategory = Pcategory;}
    if (Pdescription) {updateproduct.Pdescription = Pdescription;}
    if (Price) {updateproduct.Price = Price;}
    if (Availableunits) {updateproduct.Availableunits = Availableunits;}
    if (req.file) {
      updateproduct.Pimage = "./uploads/"+ req.file.filename}
      
    //Find the product to be updated and update it
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).send("Product Not Found");
    }
    
    product = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: updateproduct },
        { new: true }
      );
      
      res.send( "Update sussessfully" );
      
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  });

  router.delete("/deleteproduct/:id",async(req,res)=>{
    try {
        let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).send("Product Not Found");
    }
    
    product = await Product.findByIdAndDelete(req.params.id).then(()=>{
        res.send("Product delete Sucessfully");
    })
      
    } catch (error) {
        res.status(500).send("Internal Server Error");
      }
  });

module.exports = router;
