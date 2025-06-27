const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { protect } = require('../middleware/auth.middleware'); // <-- Nonaktifkan baris ini

// Route Register dan Login tidak berubah...
router.route('/register').post(async (req, res) => { /* ... isi fungsi ... */ });
router.route('/login').post(async (req, res) => { /* ... isi fungsi ... */ });

// --- NONAKTIFKAN SEMENTARA ROUTE INI ---
/*
router.route('/').get(protect, async (req, res) => {
  try {
    console.log('User yang mengakses:', req.user.username); 
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json('Error: ' + err.message);
  }
});
*/

module.exports = router;