const pool = require("../db");
const express = require("express");
const router = express.Router();
var fetchuser = require("../middlleware/fetchuser");

router.post("/add", fetchuser, (req, res) => {
  try {
    const addressdata = {
      uid: req.user.id,
      fname: req.body.fname,
      lname: req.body.lname,
      phoneno: req.body.phoneno,
      email: req.body.email,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      postalcode: req.body.postalcode,
    };
    pool.query(
      "insert into address(uid,fname,lname,phoneno,email,street,city,state,postalcode) values($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [
        addressdata.uid,
        addressdata.fname,
        addressdata.lname,
        addressdata.phoneno,
        addressdata.email,
        addressdata.street,
        addressdata.city,
        addressdata.state,
        addressdata.postalcode,
      ],
      (error, result) => {
        if (error) {
          throw error;
        }
        res.status(201).send("address add Successfully");
      }
    );
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/fetch", fetchuser, (req, res) => {
  try {
    pool.query(
      "select * from address where uid=$1",
      [req.user.id],
      (error, results) => {
        if (error) {
          throw error;
        }
        if (results.rowCount > 0) {
          res.json(results.rows);
        } else {
          res.send(["No address Available"]);
        }
      }
    );
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
    pool.query(
      "select * from address where aid=$1",
      [req.params.id],
      (error, results) => {
        if (results.rows[0].uid === req.user.id) {
          pool.query(
            "DELETE FROM orders WHERE aid=$1",
            [req.params.id],
            (error, result) => {
              if (error) {
                throw error;
              } else {
                res.send("address deleted Sucessfully");
              }
            }
          );
        } else {
          res.send("you are not a valid user of this order");
        }
      }
    );
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.put("/update/:id", fetchuser, async (req, res) => {
  try {
    const addressdata = {
      fname: req.body.fname,
      lname: req.body.lname,
      phoneno: req.body.phoneno,
      email: req.body.email,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      postalcode: req.body.postalcode,
    };
    pool.query(
      "update address set fname=$1,lname=$2,phoneno=$3,email=$4,street=$5,city=$6,state=$7,postalcode=$8 where aid=$9",
      [
        addressdata.fname,
        addressdata.lname,
        addressdata.phoneno,
        addressdata.email,
        addressdata.street,
        addressdata.city,
        addressdata.state,
        addressdata.postalcode,
        req.params.id,
      ],
      (error, result) => {
        if (error) {
          throw error;
        } else {
          res.send("address update sussessfully");
        }
      }
    );
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/alladdress", (req, res) => {
  try {
    pool.query("SELECT * FROM address", (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rowCount > 0) {
        res.json(results.rows);
      } else {
        res.send(["No any address Available To Show."]);
      }
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
