const mongoose = require('mongoose');

// Define User scheme
const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

// Instantiate model
const User = mongoose.model('User', userSchema);

// Export module
module.exports = User;
