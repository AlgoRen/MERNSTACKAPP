const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

// Purpose:
//    1) To handle GET request to "/api/auth" that come from the auth action file.
//    2) To handle POST request to "/api/auth" that come from the auth action file.

// How it works:
//    1) The GET method is attached to the router instance, also known as a mini-app, that passes in the route
// "/", the function auth, and a async callback function that passes in req, res objects.
//    2) The GET method ran on the router instance loads a try-catch statement within the async callback function.
//    3) The try block creates a constant with the name user that assigns the result of an await call, with the 
// use of mongoose to query the database, using the findById method on the User model. The findById method takes in 
// the parameter req.user.id, attaches the select method, and passes in "-password" to omit the password field.
// The result of user is then passed in as parameter into res.json that will send it to the action that made
// the request.
//    4) The catch block takes in error, as err, and passes in the error message into console.error. 
// A status of 500 is sent via res.status and attaches the message "Server Error" using the send method.
//    5) The POST method is attached to the router instance, passes in the route "/", an array with 
//  express validator functions called check. The first of the check functions has the parameters "email" and 
// "Please include a valid email" and attaches an isEmail method to verify if the email is a valid email.
// The second of the check functions has the parameters "password" and "Password is required" and attaches
// an exists method to verify if the password is a valid password. The third and final parameter of the 
// post method is an async function that takes in req and res as parameters. Inside of the async function
// a constant called errors is set to the result of the function validationResult being run with the req
// object as a parameter. An if statement checks the truth value of the constant errors not being empty, 
// meaning errors do exist. The if statement then returns a status 400 and a JSON object containing
// the array of errors. The constants email and password are deconstructed off of req.body. 
//    6) The async function loads a try-catch statement. 
//    7) The try block creates a variable with the name user that assigns the result of an await call to 
// query the database using the findOne method on the User model. The findOne method takes in the parameter 
// email contained in a object. If the returned result of user is equal to a false condition, such as null, 
// then an if statement returns a status 400 and a JSON object containing a message saying "Invalid Credentials" 
// with the res object. A constant with the name of isMatch is created and assigns the result of an await call 
// to the bcrypt package, which runs a compare method passing in password and user.password, respectively, 
// as parameters, this is done to check the encrypted password with the non-encrypted password in a secure manner. 
// If the returned result of isMatch is equal to a false condition, such as null, then an if statement returns a 
// status 400 and a JSON object containing a message saying "Invalid Credentials" with the res object.
//    8) A constant with the name payload is created and is set to an object containing a property called
// user, which is then set to an object with the property id set to user.id. 
//    9) A sign method is attached to the jwt package. The sign method takes in the payload constant, an 
// object containing an expiresIn property set to the value of 360000, a callback function that takes in 
// the parameters err and token, respectively. The callback function an if throw statement, if there is 
// an error, an error will be thrown, else the token will be sent in object notation with res.json. 
//    10) The catch block takes in error, as err, and passes in the error message into console.error. 
// A status of 500 is sent via res.status and attaches the message "Server Error" using the send method.


// @route   GET API/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
  // * api/auth knows what user to get based on the localStorage auth token
  // * that was decoded from the auth middleware, then stored the user
  // * along with its id in the req param.
  try {
    const user = await User.findById(req.user.id).select("-password");
    //* Sending user information on request to /api/auth *
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

// @route POST API/auth
// @desc Authenticate user and get token
// @access Public
router.post(
  "/",
  [
    check("email", "Please include a valid email.").isEmail(),
    check("password", "Password is required.").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists and return user information from DB.
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      //* Checking encrypted password from the database with password
      //* sent via a req.body
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Return jsonwebtoken
      //* Storing payload with the id found from DB *
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        // Set to 100 hours for development. Change to 10 hours production.
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          //* Sending auth token to /api/auth *
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
