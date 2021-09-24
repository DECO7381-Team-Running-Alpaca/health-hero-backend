/* eslint-disable no-undef */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const { urlencoded } = require('express');
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
  // check
  if (!user) {
    return response(res, 400, "User doesn't exist");
  }

  if (!user.checkUser(req.body.password)) {
    return response(res, 400, 'Incorrect username or password');
  }

  const token = await user.generateAuthToken();
  return response(res, 201, 'You have been logged in', {
    id: user._id,
    token,
  });
};

// Log out
const logOut = async (req, res) => {
  const { user } = req;
  req.user.tokens = req.user.tokens.filter((token) => {
    return token.token !== req.token;
  });

  await req.user.save();
  const token = await user.generateAuthToken();
  response(res, 201, 'You have been logged out.', {
    id: user._id,
    token,
  });
};

// Get current users
const getCurrentUser = async (req, res) => {
  const { user } = req;
  const token = await user.generateAuthToken();
  return response(res, 201, req.user, {
    id: user._id,
    token,
  });
};

// Update current user
const updateCurrentUser = async (req, res) => {
  const { user } = req;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['password', 'email', 'height', 'weight'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({
      error: 'Invalid update!',
    });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send({
      message: 'Update success.',
      user: req.user,
    });
  } catch (e) {
    res.status(500).send({
      message: 'Unexpected Error.',
    });
  }
};

// Delete current user
const deleteCurrentUser = async (req, res) => {
  const { user } = req;
  await req.user.remove();
  return response(res, 201, `${req.user}deleted!`, {
    id: user._id,
    token,
  });
};

// Add a preference to current user
const addPreference = async (req, res) => {
  const { user } = req;
  const token = await user.generateAuthToken();
  const preference = await Preference.findOne({ p_name: req.body.p_name });
  if (!preference) {
    return response(res, 400, 'Preference not found');
  }
  const allPreferences = req.user.preferences;
  allPreferences.forEach((pref) => {
    if (pref.toString() === preference._id.toString()) {
      return response(res, 400, 'Preference duplicated');
    }
  });

  req.user.preferences = req.user.preferences.concat(preference);
  await req.user.save();
  response(res, 201, 'preference has been added', {
    id: user._id,
    token,
  });
};

// Remove a preference from a user
const removePreference = async (req, res) => {
  const { user } = req;
  const token = await user.generateAuthToken();
  const targerPreference = await Preference.findOne({
    p_name: req.params.p_name,
  });
  if (!targerPreference) {
    return response(res, 400, 'Preference does not exsit');
  }
  const userPreference = req.user.preferences;
  userPreference.forEach((preference) => {
    if (preference.toString() === targerPreference._id.toString()) {
      req.user.preferences = req.user.preferences.remove(targerPreference);
      return response(res, 201, 'delete successfully!', {
        id: user._id,
        token,
      });
    }
  });
};

// Remove an allergy from a user
const removeAllergy = async (req, res) => {
  const { user } = req;
  const token = await user.generateAuthToken();
  const targerAllergy = await Allergy.findOne({ a_name: req.params.a_name });
  if (!targerAllergy) {
    return response(res, 400, 'Allergy does not exsit');
  }

  const userAllergy = req.user.allergies;
  userAllergy.forEach((allergy) => {
    if (allergy.toString() === targerAllergy._id.toString()) {
      req.user.allergies = req.user.allergies.remove(targerAllergy);
      return response(res, 201, 'delete successfully!', {
        id: user._id,
        token,
      });
    }
  });
};

// add multipule preferences by body
const addmultiplePreference = async (req, res) => {
  const { userid, preference } = req.body;
  const { user } = req;
  const token = await user.generateAuthToken();
  preference.forEach(async (pref) => {
    const nameofPreference = await Preference.findOne({ p_name: pref });
    // check preference with Preference
    if (!nameofPreference) {
      return response(res, 400, 'preference does not exist');
    }

    const userPreference = user.preferences;
    // check the preference with user's
    await userPreference.forEach((uPref) => {
      if (uPref.toString() === nameofPreference._id.toString()) {
        return response(res, 400, 'Preference duplicated.');
      }
    });

    req.user.preferences = req.user.preferences.concat(nameofPreference);
  });
  await req.user.save();
  return response(res, 201, 'Preferece has been added.', {
    id: userid,
    token,
  });
};

// add multipule allergies by body
const addmultipleAllergies = async (req, res) => {
  try {
    const { userid, allergy } = req.body;
    allergy.forEach(async (alle) => {
      const nameofAllergy = await Allergy.findOne({ a_name: alle });
      // check preference with Preference
      if (!nameofAllergy) {
        res.status(400).json('error');
        return;
      }
      const user = await User.findById(userid);
      const userAllergy = user.allergies;
      // check the preference with user's
      await userAllergy.forEach((uAllergy) => {
        if (uAllergy.toString() === nameofAllergy._id.toString()) {
          return res.status(400).send({
            message: 'Allergy duplicated.',
          });
        }
      });

      req.user.allergies = req.user.allergies.concat(nameofAllergy);
    });
    await req.user.save();
    return res.send({
      message: 'Allergy has been added.',
      user: req.user,
    });
  } catch (error) {
    res.status(400).json('error');
  }
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
  removePreference,
  removeAllergy,
  generateMealPlan,
  addmultiplePreference,
  addmultipleAllergies,
};
