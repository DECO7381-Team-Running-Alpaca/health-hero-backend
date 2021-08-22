const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
// const MealList = require('./mealList');

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
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
  preferences: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Preference',
    },
  ],
  allergies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Allergy',
    },
  ],
  // current_plan: [MealList],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// eslint-disable-next-line func-names
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ _id: user._id.toString() }, 'healthhero');

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
