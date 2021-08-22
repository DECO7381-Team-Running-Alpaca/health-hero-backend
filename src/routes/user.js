const express = require('express');
// const bcrypt = require('bcryptjs');
const User = require('../models/user');
const validator = require('../middlewares/validator');
const Preference = require('../models/preference');
// const Allergy = require('../models/preference');

const router = new express.Router();

// Sign up
// eslint-disable-next-line consistent-return
router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    const existUser = await User.findOne({ user_name: user.user_name });
    if (existUser) {
      return res.status(400).send('Username unavailable. User has existed.');
    }

    // user.password = await bcrypt.hash(user.password, 8);
    const token = await user.generateAuthToken();
    user.save();

    res.status(201).send({
      message: 'User Created!',
      user,
      token,
    });
  } catch (error) {
    res.status(400).send({
      message: 'Please make sure that body is well organized.',
    });
  }
});

// Log in
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findOne({ user_name: req.body.user_name });

    if (!user) {
      throw Error();
    }

    // const isMatch = await bcrypt.compare(
    //   bcrypt.hash(req.body.password, 8),
    //   user.password
    // );
    let isMatch = false;
    if (user.password === req.body.password) {
      isMatch = true;
    }

    if (!isMatch) {
      throw Error();
    }

    const token = await user.generateAuthToken();

    res.send({
      message: 'You have been logged in.',
      user,
      token,
    });
  } catch (error) {
    res.status(400).send({
      message: 'You Shall Not Pass!',
    });
  }
});

// Logout
router.post('/users/logout', validator, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send({
      message: 'Current token logged out.',
      user: req.user,
    });
  } catch (error) {
    res.status(500).send({
      message: '???',
    });
  }
});

// Logout All
router.post('/users/logout_all', validator, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send({
      message: 'All tokens logged out.',
      user: req.user,
    });
  } catch (error) {
    res.status(500).send();
  }
});

// Get all users
router.get('/users/all', async (req, res) => {
  const users = await User.find({});
  res.send({
    message: '留个后门',
    users,
  });
});

// Get current user
router.get('/users/me', validator, async (req, res) => {
  res.send(req.user);
});

// Update current user
// eslint-disable-next-line consistent-return
router.patch('/users/dev/:user_name', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'password',
    'email',
    'height',
    'weight',
    'preferences',
    'allergies',
    'current_plan',
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({
      error: 'Invalid update!',
    });
  }

  try {
    const user = await User.findOne({ user_name: req.params.user_name });

    if (!user) {
      return res.status(404).send({
        message: 'User not found!',
      });
    }

    // eslint-disable-next-line no-return-assign
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    res.send({
      message: 'Update success.',
      user,
    });
  } catch (e) {
    res.status(500).send({
      message: 'Unexpected Error.',
    });
  }
});

// Update current user
// eslint-disable-next-line consistent-return
router.patch('/users/me', validator, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'password',
    'email',
    'height',
    'weight',
    'preferences',
    'allergies',
    'current_plan',
  ];
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
});

// Delete a user by username
// eslint-disable-next-line consistent-return
router.delete('/users/dev/:user_name', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      user_name: req.params.user_name,
    });

    if (!user) {
      return res.status(400).send({
        message: 'User not found.',
      });
    }

    res.send({
      message: 'User deleted.',
      user,
    });
  } catch (error) {
    res.status(400).send({
      message: 'Delete failed.',
    });
  }
});

// Delete current user
router.delete('/users/me', validator, async (req, res) => {
  try {
    await req.user.remove();
    res.send({
      message: 'User deleted.',
      user: req.user,
    });
  } catch (e) {
    res.status(500).send();
  }
});

// Add a preference to current user by p_name
// eslint-disable-next-line consistent-return
router.post('/users/preferences/:p_name', validator, async (req, res) => {
  try {
    const preference = await Preference.findOne({ p_name: req.params.p_name });
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
});

// Remove a preference from a user

// Get all preferences from a user

// Add an allergy to current user by a_name

// Remove an allergy from a user

// Get all allergies from a user

module.exports = router;
