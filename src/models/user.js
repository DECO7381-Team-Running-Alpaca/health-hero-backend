const mongoose = require('mongoose');
const validator = require('validator');
const Allergy = require('./allergy');
const MealList = require('./mealList');
const Preference = require('./preference');

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid!');
        }
      },
    },
    height: {
      type: Number,
      required: true,
      min: 100,
      max: 250,
    },
    weight: {
      type: Number,
      required: true,
      min: 30,
      max: 250,
    },
    preferences: [Preference],
    allergies: [Allergy],
    current_plan: [MealList],
  },
  { _id: false }
);

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  // TO DO: validation

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
