const mongoose = require('mongoose');

const mealListSchema = new mongoose.Schema({
  name: {

  },
  calorie: {

  },
  tanshui: {

  },
  reliang: {

  },
  filter1: {

  },
  filter2: {

  },
  filter3: {

  }
});

const MealList = mongoose.model('MealList', mealListSchema);

module.exports = MealList;
