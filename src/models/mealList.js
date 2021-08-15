const mongoose = require('mongoose');

const mealListSchema = new mongoose.Schema({});

// eslint-disable-next-line func-names
mealListSchema.pre('save', async function (next) {
  // TO DO: validation

  next();
});

const MealList = mongoose.model('Food-preference', mealListSchema);

module.exports = MealList;
