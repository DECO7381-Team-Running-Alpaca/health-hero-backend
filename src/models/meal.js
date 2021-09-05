const mongoose = require('mongoose');

const mealListSchema = new mongoose.Schema({
  title: {

  },
  source_url: {

  },
  dish_types: [
    {

    }
  ],
  ingredients: [
    {

    }
  ],
  calories: {

  },
});

const MealList = mongoose.model('MealList', mealListSchema);

module.exports = MealList;
