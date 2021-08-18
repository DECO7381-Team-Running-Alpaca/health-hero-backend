const express = require('express');
const User = require('../models/user');
// const auth = require('../middlewares/validator');
const router = new express.Router();

// Sign up
router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    // TODO: AUTHENTIFICATION

    res.status(201).send({
      message: 'User Created!',
      user,
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
    const user = await User.findByCredential(
      req.body.user_name,
      req.body.password
    );
    res.send({
      message: 'You have been logged in.',
      user,
    });
  } catch (error) {
    res.status(400).send({
      message: 'Username/Password not correct.',
    });
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

// Get user
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      res.statuss(404).send({
        message: 'User not found.',
      });
    }

    res.send(user);
  } catch (error) {
    res.status(500).send({
      message: 'Unexpected Error.',
    });
  }
});

// Update current user
// eslint-disable-next-line consistent-return
router.patch('users/:id', async (req, res) => {
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
    const user = await User.findOne({ _id: req.params.id });

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

module.exports = router;
