const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
router.post(
  "/",
  [
    body("name", "Please Enter valid name").isLength({ min: 3 }),
    body("email", "Please Enter Valid Email").isEmail(),
    body("password", "Please Enter Valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success,errors: errors.array() });
    }
    try {
      //checking user already exixt or not
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res.status(400).json({success, error: "This eamil is arleay exites" });
      }
      const salt = await bcrypt.genSalt(10);
      const setPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: setPass,
        email: req.body.email,
      });
      const JWT_SECRET = "Ahmeralma12@";
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success,authToken});
      // .then(user=>res.json(user))
      // .catch(err=>{console.log(err)
      // res.json({error:"Please provided unique data"})})

      // res.json({"message":"Data added successfully"})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occurred");
    }
  }
);

//Authenticate a user using
router.post(
  "/login",
  [
    body("email", "Enter A valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //if there are error return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user =await User.findOne({ email });
      if (!user) {
        let success=false;
        return res
          .status(400)
          .json({success, error: "please try to login with correct credential " });
      }
      const passwordCompare =await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        let success=false;
        return res
          .status(400)
          .json({success, error: "please try to login with correct credential " });
      }
      const JWT_SECRET = "Ahmeralma12@";

      const data = {
        user: {
          id: user.id,
        },
      };
      let success=true;
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success,authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internsl server error");
    }
  }
);

//get user data
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    // console.log(userId);
    const user = await User.findById(userId).select();

// console.log(user);
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});
module.exports = router;
