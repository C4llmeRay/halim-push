const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
function generateToken(user) {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '11h' });
}

// User login
async function loginUser(username, password) {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('User not found');
  }
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }
  const token = generateToken(user);
  return { user, token };
}


module.exports = {
  loginUser
};