const pool = require("../db");
const express = require("express");
const router = express.Router();
var fetchuser = require("../middlleware/fetchuser");

router.post("/addneworder", fetchuser, (req, res) => {
  try {
    const orderdata = {
      uid: req.user.id,
      pid: req.body.pid,
      orderquantity: req.body.orderquantity,
      orderdate: Date.now(),
      totalamount: req.body.totalamount,
      cardholdername: req.body.cardholdername,
      cardnumber: req.body.cardnumber,
    };
    pool.query(
      "insert into orders(uid, pid, orderquantity,orderdate, totalamount, cardnumber, cardholdername) values($1,$2,$3,$4,$5,$6,$7)",
      [
        orderdata.uid,
        orderdata.pid,
        orderdata.orderquantity,
        orderdata.orderdate,
        orderdata.totalamount,
        orderdata.cardnumber,
        orderdata.cardholdername,
      ],
      (error, result) => {
        if (error) {
          throw error;
        }
        res.status(201).send("Order Successfully");
      }
    );
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/userorders", fetchuser, (req, res) => {
  try {
    pool.query(
      "select * from orders where uid=$1",
      [req.user.id],
      (error, results) => {
        if (error) {
          throw error;
        }
        if (results.rowCount > 0) {
          res.json(results.rows);
        } else {
          res.send(["No Orders Available"]);
        }
      }
    );
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/cancelorder/:id", fetchuser, async (req, res) => {
  try {
    pool.query(
      "select * from orders where oid=$1",
      [req.params.id],
      (error, results) => {
        if (results.rows[0].uid === req.user.id) {
          pool.query(
            "DELETE FROM orders WHERE oid=$1",
            [req.params.id],
            (error, result) => {
              if (error) {
                throw error;
              } else {
                res.send("Order Cancel Sucessfully");
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

router.get("/allorders", (req, res) => {
  try {
    pool.query("SELECT * FROM orders", (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rowCount > 0) {
        res.json(results.rows);
      } else {
        res.send(["No Orders Available To Show."]);
      }
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
