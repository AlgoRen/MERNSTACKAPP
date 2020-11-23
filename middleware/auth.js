const jwt = require('jsonwebtoken');
const config = require('config');

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
        console.log("Decoded user info: ", decoded.user);
        req.user = decoded.user
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid.' });
    }
}