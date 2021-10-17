/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
const response = require('../utils/resFormatter');

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

  return response(res, 201, 'Fetch preferences successfully.', {
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

  return response(res, 201, 'Fetch allergies successfully.', {
    id: req.user._id,
    allergies: userAllergies,
  });
};

module.exports = {
  addMultiplePreference,
  addMultipleAllergies,
  getCurrentUserPreferences,
  getCurrentUserAllergies,
};
