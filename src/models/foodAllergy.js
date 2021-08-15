const mongoose = require('mongoose');

const foodAllergySchema = new mongoose.Schema({});

// eslint-disable-next-line func-names
foodAllergySchema.pre('save', async function (next) {
  // TO DO: validation

  next();
});

const FoodAllergy = mongoose.model('Food-preference', foodAllergySchema);

module.exports = FoodAllergy;
