const mongoose  = require("mongoose");
const bcrypt    = require ("bcryptjs");
const config    = require("../config/database");

// The User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model("User", UserSchema);

module.exports.getUserById = (id, callback) => User.findById(id, callback);
module.exports.getUserByUsername = (username, callback) => User.findOne({ username: username }, callback);


/**
 * Adding the user to the database after a successful password-hash
 * 
 * @param {String} newUser - An object structured according to UserSchema
 * @param {Any} callback
 * 
 * Error handling
 * --------------
 * Throws error if it is spotted
 */
module.exports.addUser = (newUser, callback) => 
{
    bcrypt.genSalt(10, (err, salt) => {
        if(err) throw err;
        bcrypt.hash(newUser.password.toString(), salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

/**
 * Using bcrypt to see if the password is correct
 * 
 * @param {String} candidatePassword - A password in its user-written form
 * @param {String} hash - A hash that, hopefully, matches with the password
 * @param {Any} callback
 * 
 * Error handling
 * --------------
 * Throws error if it is spotted
 */
module.exports.comparePasswords = function(candidatePassword, hash, callback)
{
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => 
    {
        if (err) throw err;
        callback(null, isMatch);
    });
}