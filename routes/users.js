const express   = require("express");
const router    = express.Router();
const passport  = require("passport");
const jwt       = require("jsonwebtoken");

const User      = require("../models/user.js");
const config    = require("../config/database.js");

/**
 * POST request to /register
 * 
 * Functionality
 * -------------
 * Attempts to create a User model object and then calls a function
 * to save the object to a MongoDB cluster.
 * 
 * Error handling
 * --------------
 * Responds with a JSON that contains a pre-defined error message.
 */
router.post("/register", (req, res) => 
{
    
    // Returning an error if a mandatory value is missing
    // Mandatory values in the User model: email, username & password
    if (!req.body.email || !req.body.username || req.body.password)
    {
        return res.json({ success: false, msg: "Failed to register the user." });
    }

    // Creating an object that aligns with User model by taking values from req.body
    let newUser = new User ({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    // 
    saveUser = User.addUser(newUser, (err, user) => 
    {
        if(err) 
        {
            return res.json({ success: false, msg: "Failed to register the user." });
        } 
    });
    res.json(saveUser) 
});

/**
 * POST request to /authenticate
 * 
 * Functionality
 * -------------
 * Attempts to find a user that matches the information given in req.body.
 * If a match is found, the passwords are compared. If the password is 
 * deemed correct, the authentication is successful.
 * 
 * Error handling
 * --------------
 * Responds with a JSON that contains a pre-defined error message.
 */
router.post("/authenticate", (req, res) => 
{
    User.getUserByUsername(req.body.username, (err, user) =>
    {
        if (err) throw err;
        if (!user)
        {
            return res.json({ success: false, msg: "User not found" });
        }
        User.comparePassword(password, user.password, (err, isMatch) => 
        {
            if (err) throw err;
            if (!isMatch)
            {
                return res.json({ success: false, msg: "Wrong password" });
            }
            const token = jwt.sign(user, config.secret, { expiresIn: 604800 });
            res.json({ 
                success: true,
                token: `JTW ${token}`,
                user: {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                }
            })
        });
    });
});

/**
 * 
 */
router.get("/profile", passport.authenticate("jwt", { session: false }), (req, res) => 
{
    res.json({ user: req.user });
});


module.exports = router;