const express = require("express");
const User = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');

//This Route will create user.
router.post("/createuser",[
    body('Email').isEmail().withMessage('Enter a email in proper manner'),
    body('Password').isLength({ min: 5 })
],async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
    const user = User(req.body);
    await user.save().then(() => {
      res.json(user);
    });

  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

//This Route will login user.
router.post("/login", async (req, res) => {
  try {
    const userdata = await User.find();
    if (
      userdata[0].Email == req.body.Email &&
      userdata[0].Password == req.body.Password
    ) {
      res.send(userdata[0]);
    } else {
      res.send({warning:"Enter Valid Email and Password"});
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
