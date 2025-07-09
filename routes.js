const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = new User({ email, password, role: role || 'customer' });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catchA(error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
