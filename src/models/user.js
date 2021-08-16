const mongoose = require('mongoose');
const validator = require('validator');
const meal = require('./mealList');

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
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
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
    preference: {
      type: Array,
      default: [],
    },
    allergy: {
      type: Array,
      default: [],
    },
    current_plan: [meal],
  },
  { _id: true }
);

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  // TO DO: validation

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
