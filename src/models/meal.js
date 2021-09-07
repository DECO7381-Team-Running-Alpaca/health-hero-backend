const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  source_url: {
    type: String,
    trim: true,
  },
  dish_types: [
    {
      type: String,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!(value in ('breakfast', 'lunch', 'dinner'))) {
          throw new Error('Dish type must be breakfast, lunch or dinner.');
        }
      },
    },
  ],
  ingredients: [
    {
      type: String,
      trim: true,
    },
  ],
  calories: {
    type: Number,
    min: 0,
  },
});

const MealList = mongoose.model('Meal', mealSchema);

module.exports = MealList;
