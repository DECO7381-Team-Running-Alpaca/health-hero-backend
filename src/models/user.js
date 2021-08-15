const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({});

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  // TO DO: validation

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
