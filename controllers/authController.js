const passport = require('passport');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging in after registration' });
      }
      return res.status(201).json({ message: 'User registered successfully', user: newUser });
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.loginUser = async (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!user) {
      return res.status(400).json({ message: 'Incorrect username or password' });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging in' });
      }
      return res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res);
};

exports.logoutUser = async (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
};
