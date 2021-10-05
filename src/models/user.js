/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (value.length < 6 || value.length > 18) {
        throw new Error('Username length invalid.');
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (value.length < 6) {
        throw new Error('Password length invalid.');
      }
      let upperIncluded = false;
      let lowerIncluded = false;
      let digitIncluded = false;
      value.split('').forEach((char) => {
        if (validator.isNumeric(char)) {
          digitIncluded = true;
        } else if (validator.isLowercase(char)) {
          lowerIncluded = true;
        } else if (validator.isUppercase(char)) {
          upperIncluded = true;
        }
      });
      if (!(upperIncluded && lowerIncluded && digitIncluded)) {
        throw new Error(
          'Password must include uppercase, lowercase and number'
        );
      }
    },
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
  current_plan: {
    type: Object,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY);

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.checkUser = async function (password) {
  const user = this;
  await bcrypt.compare(password, user.password, function (err, result) {
    return result;
  });
};

userSchema.pre('save', async function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
  });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
