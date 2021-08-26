const express = require('express');
// const bcrypt = require('bcryptjs');
const User = require('../models/user');
const validator = require('../middlewares/validator');
const Preference = require('../models/preference');
const Allergy = require('../models/allergy');
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

// Update current user by username
// eslint-disable-next-line consistent-return
router.patch('/users/dev/:user_name', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['user_name', 'password', 'email', 'height', 'weight'];
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
router.delete('/users/preferences/:p_name', validator, async (req, res) => {
    // 1.拿到目标 2.检查目标是否存在于Preference库中 3. 检查目标是否存在于user库中 4. 从User内删除
    try{
      const targerPreference = await Preference.findOne({ p_name: req.params.p_name }); // 1+2
      const userPreference = req.user.preferences //4 拿到user的preference
      userPreference.forEach((preference) => {
      if(preference.toString() === targerPreference._id.toString()){
          req.user.preferences = req.user.preferences.remove(targerPreference)// shanchu
        
          res.send({
              message:"delete successfully!",
              user: req.user
    })
      }
    })
    res.status(402).send({
      message: "There is not such a preference"
    })}catch(error){
      res.status(402).send({
        message:"fail to delete"
      })
    }
});

// Get all preferences from a user
router.get('/users/preferences/', validator, async (req, res) => {
  try {
    const allPreferences = req.user.preferences;
    if(allPreferences.lengh === 0){
      res.status(402).send({
        message:"No preference for this user"
      })
    }
    res.send({
      message: 'Preferece has been founded.',
      allPreferences
    });
  } catch (error) {
    res.status(400).send({
      message: 'cant find preferences.',
    });
  }
});
// Add an allergy to current user by a_name
router.post('/users/allergies/:a_name', validator, async (req, res) => {
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
});
// Remove an allergy from a user
router.delete('/users/allergies/:a_name', validator, async (req, res) => {
  // 1.拿到目标 2.检查目标是否存在于Preference库中 3. 检查目标是否存在于user库中 4. 从User内删除
  try{
    const targerAllergy = await Allergy.findOne({ p_name: req.params.p_name }); // 1+2
    const userAllergy = req.user.allergies //4 拿到user的preference

    userAllergy.forEach((allergy) => {
    if(allergy.toString() === targerAllergy._id.toString()){
        req.user.allergies = req.user.allergies.remove(targerAllergy)// shanchu
      
        res.send({
            message:"delete successfully!",
            user: req.user
  })
    }
  })
  res.status(402).send({
    message: "There is not such an allergy"
  })}catch(error){
    res.status(402).send({
      message:"fail to delete"
    })
  }
});
// Get all allergies from a user
router.get('/users/allergies/', validator, async (req, res) => {
  try {
    const allAllergies = req.user.allergies;
    if(allAllergies.lengh === 0){
      res.status(402).send({
        message:"No allergies for this user"
      })
    }
    res.send({
      message: 'Allergies has been founded.',
      allAllergies
    });
  } catch (error) {
    res.status(400).send({
      message: 'cant find allergies.',
    });
  }
});

// add mutipule preferences by body
// 1. 从req.body 中读取[] 2.对其进行遍历， 判断其内每个元素是否存在于 Preferece的库中 
//3. 针对在库中的， 再次进行判断是否于user preference重复
// 4.将不重复的加入， 重复的告知用户具体那个preference重复

module.exports = router;
