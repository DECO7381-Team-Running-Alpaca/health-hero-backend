const mongoose = require('mongoose');

const foodPreferenceSchema = new mongoose.Schema({});

// eslint-disable-next-line func-names
foodPreferenceSchema.pre('save', async function (next) {
  // TO DO: validation

  next();
});

const FoodPreference = mongoose.model('Food-preference', foodPreferenceSchema);

module.exports = FoodPreference;
