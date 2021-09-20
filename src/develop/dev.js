const Preference = require('../models/preference');
const Allergy = require('../models/allergy');

// preference
// Get all preferences from a user
const getCurrentUserPreferences = async (req, res) => {
  try {
    const allPreferences = req.user.preferences;
    if (allPreferences.lengh === 0) {
      res.status(402).send({
        message: 'No preference for this user',
      });
    }
    res.send({
      message: 'Preferece has been founded.',
      allPreferences,
    });
  } catch (error) {
    res.status(400).send({
      message: 'cant find preferences.',
    });
  }
};
// Add a preference to current user
// eslint-disable-next-line consistent-return
const addPreference = async (req, res) => {
  try {
    const preference = await Preference.findOne({ p_name: req.body.p_name });
    console.log(req.body.p_name);
    console.log(preference);
    if (!preference) {
      return res.status(400).send({
        message: 'Preference not found.',
      });
    }

    const allPreferences = req.user.preferences;
    // eslint-disable-next-line consistent-return
    allPreferences.forEach((pref) => {
      // eslint-disable-next-line no-underscore-dangle
      if (pref.toString() === preference._id.toString()) {
        return res.status(400).send({
          message: 'Preference duplicated.',
        });
      }
    });

    req.user.preferences = req.user.preferences.concat(preference);
    await req.user.save();

    res.send({
      message: 'Preferece has been added.',
      user: req.user,
    });
  } catch (error) {
    res.status(400).send({
      message: 'Adding failed.',
    });
  }
};

// Allergy
// Get all allergies from a user
const getCurrentUserAllergies = async (req, res) => {
  try {
    const allAllergies = req.user.allergies;
    if (allAllergies.lengh === 0) {
      res.status(402).send({
        message: 'No allergies for this user',
      });
    }
    res.send({
      message: 'Allergies has been founded.',
      allAllergies,
    });
  } catch (error) {
    res.status(400).send({
      message: 'cant find allergies.',
    });
  }
};

// Add an allergy to current user by a_name
// eslint-disable-next-line consistent-return
const addAllergy = async (req, res) => {
  try {
    const targetAllergy = await Allergy.findOne({ a_name: req.params.a_name });
    if (!targetAllergy) {
      return res.status(400).send({
        message: 'allergy not found.',
      });
    }

    const allAllergies = req.user.allergies;
    // eslint-disable-next-line consistent-return
    allAllergies.forEach((aller) => {
      // eslint-disable-next-line no-underscore-dangle
      if (aller.toString() === targetAllergy._id.toString()) {
        return res.status(400).send({
          message: 'Allergy duplicated.',
        });
      }
    });

    req.user.allergies = req.user.allergies.concat(targetAllergy);
    await req.user.save();

    res.send({
      message: 'Allergies has been added.',
      user: req.user,
    });
  } catch (error) {
    res.status(400).send({
      message: 'Adding failed.',
    });
  }
};

// User
// Get current users
const getCurrentUser = async (req, res) => {
  res.send(req.user);
};

// Update current user
// eslint-disable-next-line consistent-return
const updateCurrentUser = async (req, res) => {
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
    // eslint-disable-next-line no-return-assign
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
  try {
    await req.user.remove();
    res.send({
      message: 'User deleted.',
      user: req.user,
    });
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = {
  addPreference,
  getCurrentUserPreferences,
  addAllergy,
  getCurrentUserAllergies,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
};
