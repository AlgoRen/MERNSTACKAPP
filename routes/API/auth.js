const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User');

// @route   GET API/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
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
        // See if user exists
        let user = await User.findOne({ email });

        if(!user) {
            return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid credentials'}] });
        }


        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid credentials'}] });
        }

        // Return jsonwebtoken
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