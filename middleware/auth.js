const jwt = require('jsonwebtoken');
const config = require('config');

// Purpose:
//    1) To check the auth token found in the request header to see if one exists. 
//    2) To check to auth token found in the request header is currently valid.

// How it works:
//    1) An anonymous function, is exported, passing in req, res, and next as parameters.
//    2) In the function a constant with the name of token is set to req.headers passing in the string
// x-auth-token. 
//    3) If we find that there is NOT a token in req.headers via checking to see if the newly defined token 
// constant is equal to null, then we return an error message saying 'No token, authorization defined.' via 
// the status method on the res object, we JSON-ify this message. 
//    4) If we find that there is a token in the token constant, then we run a try-catch to verify that it is
// valid by setting a constant decoded to the result of calling the verify method on the jwt package (a package
// used for we token verification). The verify method being called on jwt takes in the parameter of token and
// the value of our jwtSecret that we defined in our hidden JSON object within the config folder.
//    5) The value we get from the property user on the decoded object is then set to req.user, and we run
// the next function which is used to continue with the request after the middleware function has performed 
// its task. 
//    6) A catch block will execute if an error is to occur that sends a message saying 'Token is not valid.'

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied.' });
    }

    // Verify token
    try {
        //* Returning object with the user's id that was set by jwt.sign in api/users
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid.' });
    }
}