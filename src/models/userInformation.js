const mongoose = require('mongoose');

const userInformationSchema = new mongoose.Schema({});

// eslint-disable-next-line func-names
userInformationSchema.pre('save', async function (next) {
  // TO DO: validation

  next();
});

const UserInformation = mongoose.model(
  'User-information',
  userInformationSchema
);

module.exports = UserInformation;
