const express   = require("express");
const router    = express.Router();
const passport  = require("passport");
const jwt       = require("jsonwebtoken");

const config    = require("../config/database.js")
const User      = require("../models/user.js");
require("dotenv").config();


/**
 * POST request to /register
 * 
 * Attempts to create a User model object and then calls a function
 * to save the object to a MongoDB cluster.
 * 
 * Error handling
 * --------------
 * Responds with a JSON that contains a pre-defined error message.
 */
router.post("/register", (req, res) => 
{
    // Creating an object that aligns with User model by taking values from req.body
    let newUser = new User ({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });


    User.addUser(newUser, (err, user) => 
    {
        if(err) 
        {
            console.log(err)
            return res.json({ success: false, msg: "Failed to register the user." });
        } 
        res.json({success: true, msg: 'User registered'});
    });
});

/**
 * POST request to /authenticate
 * 
 * Attempts to find a user that matches the information given in req.body.
 * If a match is found, the passwords are compared. If the password is 
 * deemed correct, the authentication is successful.
 * 
 * Error handling
 * --------------
 * Responds with a JSON that contains a pre-defined error message.
 * 
 */
router.post("/authenticate", (req, res) => 
{
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => 
  {
    if(err) throw err;
    if(!user) 
    {
      return res.json({success: false, msg: "User not found"});
    }

    User.comparePasswords(password, user.password, (err, isMatch) => 
    {
      if(err) throw err;
      if(!isMatch) 
      {
        return res.json({success: false, msg: "Wrong password"});
      }
      const token = jwt.sign({data: user}, config.secret, { expiresIn: 604800 });
        res.json({
          success: true,
          token: "JWT " + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
          }
        })
    });
  });
});

router.get("/profile", passport.authenticate("jwt", { session: false }), (req, res) => 
{
    res.json({ user: req.user });
});

module.exports = router;