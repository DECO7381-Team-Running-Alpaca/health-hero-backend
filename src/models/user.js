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
  current_plan: [
    {
      type: Array,
    },
  ],
  preferences: [
    {
      type: String,
      ref: 'Preference',
    },
  ],
  allergies: [
    {
      type: String,
      ref: 'Allergy',
    },
  ],
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
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY, {
    expiresIn: '144h',
  });

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

userSchema.methods.savePreferences = async function (preferences) {
  const user = this;

  preferences.forEach((preference) => {
    if (preference) {
      user.preferences.push(preference);
    }
  });

  user.markModified('preferences');
  await user.save();
  return user;
};

userSchema.methods.saveAllergies = async function (allergies) {
  const user = this;

  allergies.forEach((allergy) => {
    if (allergy) {
      user.allergies.push(allergy);
    }
  });

  user.markModified('allergies');
  await user.save();
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
