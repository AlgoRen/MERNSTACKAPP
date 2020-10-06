const express = require('express');
const router = express.Router();

// @route   GET API/profile
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;