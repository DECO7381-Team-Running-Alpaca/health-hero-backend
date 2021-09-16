/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
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
  try {
    const user = await User.findOne({ user_name: req.body.user_name });

    if (!user) {
      throw Error('No user found!');
    }

    if (!user.checkUser(req.body.password)) {
      throw Error('Username/Password not correct!');
    }

    const token = await user.generateAuthToken();

    res.send({
      message: 'You have been logged in.',
      user,
      token,
    });
  } catch (error) {
    res.status(400).send({
      error,
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

// Get current users
const getCurrentUser = async (req, res) => {
  res.send(req.user);
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

// Remove a preference from a user
const removePreference = async (req, res) => {
  try {
    const targerPreference = await Preference.findOne({
      p_name: req.params.p_name,
    });
    const userPreference = req.user.preferences;
    userPreference.forEach((preference) => {
      if (preference.toString() === targerPreference._id.toString()) {
        req.user.preferences = req.user.preferences.remove(targerPreference);

        res.send({
          message: 'delete successfully!',
          user: req.user,
        });
      }
    });
    res.status(402).send({
      message: 'There is not such a preference',
    });
  } catch (error) {
    res.status(402).send({
      message: 'fail to delete',
    });
  }
};

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
    allAllergies.forEach((aller) => {
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

// Remove an allergy from a user
const removeAllergy = async (req, res) => {
  try {
    const targerAllergy = await Allergy.findOne({ a_name: req.params.a_name }); // 1+2
    const userAllergy = req.user.allergies;

    userAllergy.forEach((allergy) => {
      if (allergy.toString() === targerAllergy._id.toString()) {
        req.user.allergies = req.user.allergies.remove(targerAllergy);

        res.send({
          message: 'delete successfully!',
          user: req.user,
        });
      }
    });
    res.status(402).send({
      message: 'There is not such an allergy',
    });
  } catch (error) {
    res.status(402).send({
      message: 'fail to delete',
    });
  }
};

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

// add mutipule preferences by body
// 1. 从req.body 中读取[] 2.对其进行遍历， 判断其内每个元素是否存在于 Preferece的库中
//  3. 针对在库中的， 再次进行判断是否于user preference重复
// *4.将不重复的加入， 重复的告知用户具体那个preference重复
// router.post('/users/preferences/', validator, async (req, res) => {
//   try{
//     const targetPreferences = await req.body

//     const userPreferences = await req.user.preferences

//     targetPreferences.forEach((preference, index) =>{
//       //check how many loops I have run
//       console.log(preference)
//       //check detail for every loop I got
//       console.log('This is ' + index + "th loop in for each")
//       if(preference === Preference.findOne({p_name :(req.body[index])})){
//         console.log('Im checking preference ')
//         userPreferences.forEach((uPreference) => {
//           // check where I am
//           console.log("imhere")
//           if(uPreference.toString() !== preference._id.toString()){
//             req.user.preferences = req.user.preferences.concat(preference)
//             req.save()
//             res.status(200).send({
//               message:"add!",
//               user:req.user
//             })
//           }
//         })
//         }

//     })
//     //  res.status('404').send({
//     //    message: "wrong input"
//     //  })
//   }catch(error){
//     res.status(400).send({
//       message:" fail to add"
//     })
//   }

// });

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
  getCurrentUserPreferences,
  addAllergy,
  removeAllergy,
  getCurrentUserAllergies,
  generateMealPlan,
};
