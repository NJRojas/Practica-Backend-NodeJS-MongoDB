const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define User schema
const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

// Schema static method
userSchema.statics.hashPassword = function (rawPassword) {
  return bcrypt.hash(rawPassword, 7);
};

// Schema Instance ethod
userSchema.methods.comparePassword = function (rawPassword) {
  return bcrypt.compare(rawPassword, this.password);
};

// Instantiate model
const User = mongoose.model('User', userSchema);

// Export module
module.exports = User;
