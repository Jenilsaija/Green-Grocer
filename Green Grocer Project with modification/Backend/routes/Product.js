const express = require("express");
const router = express.Router();
const multer = require("multer");
const fetchuser = require("../middlleware/fetchuser");
let path = require("path");
const pool = require("../db");
const { error } = require("console");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../../public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({ storage: storage });

router.get("/allproducts", (req, res) => {
  try {
    pool.query("SELECT * FROM products", (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rowCount > 0) {
        res.json(results.rows);
      } else {
        res.send(["No Products Available To Show."]);
      }
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/spsearch/:id", async (req, res) => {
  try {
    pool.query(
      "select * from products where pid=$1",
      [req.params.id],
      (error, results) => {
        if (error) {
          throw error;
        }
        if (results.rowCount > 0) {
          res.json(results.rows[0]);
        } else {
          res.send(["Not found"]);
        }
      }
    );
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/addnewproduct", upload.single("Pimage"), (req, res) => {
  try {
    const newproduct = {
      Pname: req.body.Pname,
      Pcategory: req.body.Pcategory,
      Pdescription: req.body.Pdescription,
      Price: req.body.Price,
      Availableunits: req.body.Availableunits,
      Pimage: "./uploads/" + req.file.filename,
    };
    pool.query(
      "insert into products(pname,pdescription,pcategory,price,availableunits,pimage) values($1,$2,$3,$4,$5,$6)",
      [
        newproduct.Pname,
        newproduct.Pdescription,
        newproduct.Pcategory,
        newproduct.Price,
        newproduct.Availableunits,
        newproduct.Pimage,
      ],
      (error, result) => {
        if (error) {
          throw error;
        }
        res.status(201).send("Product Insert Successfully.");
      }
    );
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.put("/updateproduct/:id", upload.single("Pimage"), async (req, res) => {
  try {
    const newproduct = {
      Pname: req.body.Pname,
      Pcategory: req.body.Pcategory,
      Pdescription: req.body.Pdescription,
      Price: req.body.Price,
      Availableunits: req.body.Availableunits,
      Pimage: req.body.Pimage,
    };
    if (req.file) {
      newproduct.Pimage = "./uploads/" + req.file.filename;
    }
    pool.query(
      "update products set pname=$1,pdescription=$2,pcategory=$3,price=$4,availableunits=$5,pimage=$6 where pid=$7",
      [
        newproduct.Pname,
        newproduct.Pdescription,
        newproduct.Pcategory,
        newproduct.Price,
        newproduct.Availableunits,
        newproduct.Pimage,
        req.params.id,
      ],
      (error, result) => {}
    );

    res.send("Update sussessfully");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deleteproduct/:id", async (req, res) => {
  try {
    pool.query(
      "DELETE FROM products WHERE pid=$1",
      [req.params.id],
      (error, result) => {
        if (error) {
          throw error;
        } else {
          res.send("Product delete Sucessfully");
        }
      }
    );
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
