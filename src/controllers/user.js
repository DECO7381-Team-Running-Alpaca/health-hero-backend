/* eslint-disable no-undef */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Preference = require('../models/preference');
const Allergy = require('../models/allergy');
const response = require('../utils/resFormatter');

// Sign Up
const signUp = async (req, res) => {
  const user = new User(req.body);

  const existUser = await User.findOne({ user_name: user.user_name });
  if (existUser) {
    return response(res, 400, 'User already exists');
  }

  bcrypt.hash(user.password, 10, (err, hash) => {
    user.password = hash;
  });

  const token = await user.generateAuthToken();
  user.save();
  return response(res, 201, `${user.user_name} has been created`, {
    id: user._id,
    token,
  });
};

// Log in
const logIn = async (req, res) => {
  const user = await User.findOne({ user_name: req.body.user_name });

  if (!user) {
    return response(res, 400, 'User not found');
  }

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (!result) {
      return response(res, 401, 'Username/Password incorrect.');
    }
    user.generateAuthToken();
    return response(res, 200, `${user.user_name} has been logged in.`, {
      id: user._id,
      token: user.tokens[user.tokens.length - 1].token,
    });
  });
};

// Log out
const logOut = async (req, res) => {
  req.user.tokens = req.user.tokens.filter((token) => {
    return token.token !== req.token;
  });

  await req.user.save();
  return response(res, 200, `User have been logged out.`);
};

// Get current users
const getCurrentUser = async (req, res) => {
  return response(res, 200, 'Fetch user successfully.', req.user);
};

// Update current user
const updateCurrentUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['password', 'email', 'height', 'weight'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return response(res, 400, `Invalid update`);
  }

  updates.forEach((update) => (req.user[update] = req.body[update]));
  await req.user.save();
  return response(res, 200, `Update success.`, {
    user: req.user,
  });
};

// Delete current user
const deleteCurrentUser = async (req, res) => {
  await req.user.remove();
  return response(res, 200, `Current user deleted`, {
    user: req.user,
  });
};

// Add a preference to current user
const addPreference = async (req, res) => {
  const preference = await Preference.findOne({ p_name: req.body.p_name });
  if (!preference) {
    return response(res, 400, `Preference not found`);
  }

  const allPreferences = req.user.preferences;
  allPreferences.forEach((pref) => {
    if (pref.toString() === preference._id.toString()) {
      return response(res, 400, `Preference duplicated.`);
    }
  });

  req.user.preferences = req.user.preferences.concat(preference);
  await req.user.save();

  return response(res, 200, `Preferece has been added.`, {
    preferences: req.user.preferences,
  });
};

// Remove a preference from a user
const removePreference = async (req, res) => {
  const targerPreference = await Preference.findOne({
    p_name: req.params.p_name,
  });
  const userPreference = req.user.preferences;

  userPreference.forEach((preference) => {
    if (preference.toString() === targerPreference._id.toString()) {
      req.user.preferences = req.user.preferences.remove(targerPreference);
      return response(res, 200, `Preference deleted.`, {
        preferences: req.user.preferences,
      });
    }
  });
  return response(res, 400, `No such preference found.`);
};

// Remove an allergy from a user
const removeAllergy = async (req, res) => {
  const targerAllergy = await Allergy.findOne({ a_name: req.params.a_name }); // 1+2
  const userAllergy = req.user.allergies;

  userAllergy.forEach((allergy) => {
    if (allergy.toString() === targerAllergy._id.toString()) {
      req.user.allergies = req.user.allergies.remove(targerAllergy);
      return response(res, 200, `Allergy deleted.`, {
        allergies: req.user.allergies,
      });
    }
  });
  return response(res, 400, `No such allergy found.`);
};

// add multiple preferences
const addMultiplePreference = async (req, res) => {
  const { preferences } = req.body;
  req.user.preferences = [];

  await req.user.savePreferences(preferences);

  return response(res, 200, 'Preferences added!', {
    user: req.user.user_name,
    preferences: req.user.preferences,
  });
};

// add multiple allergies
const addMultipleAllergies = async (req, res) => {
  const { allergies } = req.body;
  req.user.allergies = [];

  await req.user.saveAllergies(allergies);

  return response(res, 200, 'Allergies added!', {
    user: req.user.user_name,
    allergies: req.user.allergies,
  });
};

// get current user's preferences
const getCurrentUserPreferences = async (req, res) => {
  const names = req.user.preferences;
  const userPreferences = [];

  names.forEach(async (name) => {
    userPreferences.push(name);
  });

  return response(res, 201, {
    id: req.user._id,
    preferences: userPreferences,
  });
};

// get current user's allergies
const getCurrentUserAllergies = async (req, res) => {
  const names = req.user.allergies;
  const userAllergies = [];

  names.forEach(async (name) => {
    userAllergies.push(name);
  });

  return response(res, 201, {
    id: req.user._id,
    allergies: userAllergies,
  });
};

// Generate weekly meal plan

const generateMealPlan = async (req, res) => {
  const mealPlan = {
    monBreakfast: '1',
    monLunch: '2',
    monDinner: '3',
    tueBreakfase: '4',
    tueLunch: '5',
    tueDinner: '6',
    wedBreakfase: '7',
    wedLunch: '8',
    wedDinner: '9',
    thuBreakfase: '10',
    thuLunch: '11',
    thuDinner: '12',
    friBreakfase: '13',
    friLunch: '14',
    friDinner: '15',
    satBreakfase: '16',
    satLunch: '17',
    satDinner: '18',
    sunBreakfase: '19',
    sunLunch: '20',
    sunDinner: '21',
  };

  req.user.currentPlan = mealPlan;
  res.send({
    user: req.user,
  });
};

module.exports = {
  signUp,
  logIn,
  logOut,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  addPreference,
  removePreference,
  removeAllergy,
  generateMealPlan,
  addMultiplePreference,
  addMultipleAllergies,
  getCurrentUserPreferences,
  getCurrentUserAllergies,
};
