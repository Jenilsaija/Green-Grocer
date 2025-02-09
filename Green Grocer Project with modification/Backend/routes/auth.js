const express = require("express");
const router = express.Router();
const pool = require("../db");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "greengroceris$$good##boy";
var fetchuser = require("../middlleware/fetchuser");

//This Route will create user.
router.post(
  "/createuser",
  [
    body("Email", "Please Enter a Valid Email").isEmail(),
    body("Name", "Name must have 3 charechter").isLength({ min: 3 }),
    body("Password", "Pssword must be greaterthen 5 charechter.").isLength({
      min: 5,
    }),
  ],
  (req, res) => {
    let danger = false;
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      pool.query(
        "select * from users where email=$1",
        [req.body.Email.toLowerCase()],
        async (error, result) => {
          if (result.rowCount === 0) {
            const salt = await bcrypt.genSalt(10); //that is asynchronous Function
            secPass = await bcrypt.hash(req.body.Password, salt); //that is also asynchronous Function
            pool.query(
              "insert into users(name,email,pass,dob,mobileno) values($1,$2,$3,$4,$5)",
              [
                req.body.Name,
                req.body.Email.toLowerCase(),
                secPass,
                req.body.Dob,
                req.body.Mobileno,
              ],
              (error, results) => {
                if (error) {
                  console.log(error);
                } else {
                  res.status(201).send(success, "User Created Successfully.");
                }
              }
            );
          } else {
            res.status(400).json({
              danger,
              error: "Sorry User with this email alredy exist.",
            });
          }
        }
      );
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

//This Route will login user.
router.post("/login", (req, res) => {
  let danger = false;
  let success = false;
  try {
    pool.query(
      "select * from users where email=$1",
      [req.body.Email.toLowerCase()],
      async (errors, results) => {
        if (results.rowCount > 0) {
          const userdata = results.rows[0];
          const passwordcompare = await bcrypt.compare(
            req.body.Password,
            userdata.pass
          ); //this function will compare user entered password with available hashin database. and that will return true or false.
          if (!passwordcompare) {
            return res.status(400).json({
              success,
              error: "Please try to Login with Correct Credantials",
            });
          }
          const data = {
            user: {
              id: userdata.uid,
            },
          };
          const authtoken = jwt.sign(data, JWT_SECRET); //this is synchrononuse function that function will use to generate the token.(In token we will paas data or signature)using signature we verify User.
          res.json({ success: true, authtoken });
        } else {
          res.status(400).json({
            danger,
            error: "User with this email dosen't exist",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    pool.query(
      "select * from users where uid=$1",
      [userId],
      (errors, results) => {
        const data = {
          uid: results.rows[0].uid,
          name: results.rows[0].name,
          email: results.rows[0].email,
          mobileno: results.rows[0].mobileno,
          dob: results.rows[0].dob,
          isadmin:results.rows[0].isadmin
        };
        res.send(data);
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
