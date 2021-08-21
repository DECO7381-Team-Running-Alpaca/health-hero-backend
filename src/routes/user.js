const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
// const auth = require('../middlewares/validator');
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

    user.password = await bcrypt.hash(user.password, 8);
    user.save();

    // TODO: AUTHENTIFICATION

    res.status(201).send({
      message: 'User Created!',
      user,
    });
  } catch (error) {
    res.status(400).send({
      message: 'Please make sure that body is well organized.',
      error,
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

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      throw Error();
    }

    res.send({
      message: 'You have been logged in.',
      user,
    });
  } catch (error) {
    res.status(400).send({
      message: 'You Shall Not Pass!',
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
router.get('/users/:user_name', async (req, res) => {
  try {
    const user = await User.findOne({ user_name: req.params.user_name });

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
router.patch('/users/:user_name', async (req, res) => {
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

// eslint-disable-next-line consistent-return
router.delete('/users/:user_name', async (req, res) => {
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
      message: 'Delete Failed.',
    });
  }
});

module.exports = router;
