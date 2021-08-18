const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
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

const User = mongoose.model('User', userSchema);

// Find users by comparing the username and password
userSchema.statics.findByCredentials = async (userName, password) => {
  const user = await User.findOne({ user_name: userName });

  if (!user) {
    throw Error('No User Found!');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw Error('Password incorrect!');
  }

  return user;
};

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

module.exports = User;
