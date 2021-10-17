/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
// const User = require('../src/models/user');

const TEST_USER = {
  _id: mongoose.Types.ObjectId('616a306909c6fe3bc6cc4882').toHexString(),
  user_name: 'Test_a',
  password: 'Password1',
  email: 'e@e.com',
  weight: 31,
  height: 101,
};
const Preference = ['apple', 'beef'];
const Allergy = ['a', 'b'];
// const Token = User.generateAuthToken(TEST_USER._id);
module.exports = {
  TEST_USER,
  Preference,
  Allergy,
};
