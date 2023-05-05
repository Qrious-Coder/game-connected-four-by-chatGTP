const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../model/User');
const requireAuth = require('../middleware/auth');

// Route to register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password )
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    console.log(`existingUser`, existingUser)
    if (existingUser !== null) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const user = new User({
      email,
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ sub: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME })
    res.status(201).json({ message: 'User registered', token: token });
  } catch (err) {
    console.log(`Server Error: /register`,err);
    res.status(500).json({ message: err.message });
  }
});

// Route to log in a user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ sub: user._id, email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
    res.status(200).json({ token });
  } catch (err) {
    console.error(`Server Error: /login`,err);
    res.status(500).json({ message: err.message });
  }
});

// Route to play the game
router.get('/user', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.sub);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const { username, email } = user;
    res.json({ username, email });
  } catch (err) {
    console.error(`server error:`,err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
