const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// @route   GET API/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        //* Sending user information on request to /api/auth *
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error.')
    }
});

// @route POST API/auth
// @desc Authenticate user and get token
// @access Public
router.post('/', [
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Password is required.'
    ).exists()
], 
async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try{
        // See if user exists and return user information from DB.
        let user = await User.findOne({ email });

        if(!user) {
            return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid credentials'}] });
        }

        //* Checking encryped password from the database with password
        //* sent via a req.body
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid credentials'}] });
        }

        // Return jsonwebtoken
        //* Storing payload with the id found from DB *
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
                //* Sending auth token to /api/auth *
                res.json({ token });
            }
            );
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
        }
    }
);

module.exports = router;