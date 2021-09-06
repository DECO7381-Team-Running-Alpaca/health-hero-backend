/* eslint-disable consistent-return */
const User = require('../models/user');
const Preference = require('../models/preference');

// Sign Up
const signUp = async (req, res) => {
  const user = new User(req.body);

  try {
    const existUser = await User.findOne({ user_name: user.user_name });
    if (existUser) {
      return res.status(400).send('Username unavailable. User has existed.');
    }

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
};

// Log in
const logIn = async (req, res) => {
  try {
    const user = await User.findOne({ user_name: req.body.user_name });

    if (!user) {
      throw Error();
    }

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
};

// Log out
const logOut = async (req, res) => {
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
};

// Log out all
const logOutAll = async (req, res) => {
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
};

// Get all users (Dev.)
const getAllUser = async (req, res) => {
  const users = await User.find({});
  res.send({
    message: '留个后门',
    users,
  });
};

// Get current users
const getCurrentUser = async (req, res) => {
  res.send(req.user);
};

// Update current user by username
const updateUserByUsername = async (req, res) => {
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
};

// Update current user
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

// Delete a user by username
const deleteUserByUsername = async (req, res) => {
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

// Add a preference to current user
const addPreference = async (req, res) => {
  try {
    const preference = await Preference.findOne({ p_name: req.params.p_name });
    if (!preference) {
      return res.status(400).send({
        message: 'Preference not found.',
      });
    }

    const allPreferences = req.user.preferences;
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
}

// Remove a preference from a user
const removePre = async (req, res) => {
  try{
    const targerPreference = await Preference.findOne({ p_name: req.params.p_name }); 
    const userPreference = req.user.preferences 
    userPreference.forEach((preference) => {
    if(preference.toString() === targerPreference._id.toString()){
        req.user.preferences = req.user.preferences.remove(targerPreference)
      
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
}
// Get all preferences from a user
const allPre = async (req, res) => {
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
}

// Get all Allergy from a user
const allAllergy = async (req, res) => {
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
}

// Add an allergy to current user by a_name
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
}

// Remove an allergy from a user
const removeAllergy =  async (req, res) => {
  try{
    const targerAllergy = await Allergy.findOne({ a_name: req.params.a_name }); 
    const userAllergy = req.user.allergies 
    userAllergy.forEach((allergy) => {
    if(allergy.toString() === targerAllergy._id.toString()){
        req.user.allergies = req.user.allergies.remove(targerAllergy)
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
}


module.exports = {
  signUp,
  logIn,
  logOut,
  logOutAll,
  getAllUser,
  getCurrentUser,
  updateUserByUsername,
  updateCurrentUser,
  deleteUserByUsername,
  deleteCurrentUser,
  addPreference,
  removePre,
  allPre,
  allAllergy,
  addAllergy,
  removeAllergy,
  
};
