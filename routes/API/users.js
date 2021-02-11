const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

//TODO Purpose:
//TODO      1) To handle POST request to "/api/users" that come from the auth action file.

// How it works:
//      1) The POST method is attached to the router instance, also known as a mini-app, that passes in the route
// "/", an array containing three check functions, and an async callback function. The second parameter, an array
// of three check functions. The first check function takes in the strings "name" and "Name is required" as parameters
// and runs not an isEmpty methods on the check function. The second check function takes in the strings "email" and 
// "Please include a valid email." and runs isEmail method on the check function. The third check function takes in 
// the string "password" and "Please enter a password with 6 or more characters" and attaches the isLength method onto 
// the check function with an object containing the property min set to 6, as a parameter. Inside of the async callback 
// function, a constant called errors are set to the result of the function validationResult being run with the req
// object as a parameter. An if statement checks the truth value of the constant errors not being empty, meaning errors 
// do exist. The if statement then returns a status 400 and a JSON object containing the array of errors. The constants
// name, email, password are deconstructed off of the req.body object. The async callback function runs a try catch 
// statement that creates a variable with the name user and sets it to the result of an await call of the findOne method
// being run on the User model. The findOne method takes in an object containing the constant email. An if statement checks
// the user variable for a truth value, if true, the if statement will return a status of 400 with res.status and an object 
// containing the property errors set to an array that holds a message saying "User already exists" within an object using 
// an attached json method.
//?      2) A constant is created with the name of avatar and is set to the result of the url method being called on the 
//? gravatar object (a package), this is done to grab the avatar url of a user who has a registered email with the gravatar
//? service. The url method takes in email and an object with the properties s set to the string "200", r set to the string 
//? "pg", and d set to the string "mm". 
//      3) The variable user is set to a new instanced User object that contains the properties name, email, avatar, and 
// password. 
//?      4) A constant is created with the name salt and is set to the result of an await call to the genSalt method being called 
//? on the bcrypt object (a package) which creates a 10 digit randomly generated code by passing in the number 10 into the genSalt
//? method. The variable user.password is then set to the result of an await call to the hash method being called on the bcrypt
//? object. The hash method takes in the constant password and the newly created constant hash in order to encrypt the users
//? password. An await call awaits the response from the save method that runs on user, which uses mongoose to update the 
//? document in the user collection. A constant is created with the name payload and is set to an object with the property
//? user with an object as a value, which has the id property set to user.id.
//      5) The sign method is called on the jwt object (a package) that takes in payload, config.get('jwtSecret'), an object
// containing the property expiresIn and the value of 360000, and a callback function. The callback function takes in err and
// token as parameters. The callback function calls an if statement checking for an err, if true, it throws err. A res.json is 
// called with an object containing token that sends it back to auth action file. The catch block takes in error, as err, and 
// passes in the error message into console.error. A status of 500 is sent via res.status and attaches the message "Server Error" 
// using the send method.


// @route   POST API/users
// @desc    Register user
// @access  Public
router.post('/', [
    check('name' , 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
], 
async (req, res) => { 
    //* Error handeling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try{
        // See if user exists
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists'}] });
        }
        // Get users gravatar 
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        // If no user exist create user using a constructor
        user = new User({
            name, 
            email,
            avatar,
            password
        })

        // Encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Return jsonwebtoken
        //* Setting payload to hold the id that references the ObjectId set by MongoDB.
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            // Set to 100 hours for development. Change to 10 hours production.
            { expiresIn: 360000 }, 
            (err, token) => {
                if(err) throw err;
                //* Sending auth token to /api/users *
                res.json({ token })
            }
            );
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error')
        }
    }
);

module.exports = router;