/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const User = require('../models/user');
const response = require('../utils/resFormatter');
const randomFoodSearch = require('../utils/randomFoodTitle');
const prefFoodSearch = require('../utils/preferenceFoodTitle');
const foodInformation = require('../utils/recipeInformation');

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

// Generate weekly meal plan
const generateMealPlan = async (req, res) => {
  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };

  const userPreferences = req.user.preferences;
  const userAllergies = req.user.allergies;

  // ID list of random meals
  let randomMealIDs;
  await randomFoodSearch().then((apiResponse) => {
    randomMealIDs = apiResponse;
  });

  // Generate an array of seven preferences
  const preferenceInf = [];
  for (let i = 0; i < 7; i += 1) {
    shuffleArray(userPreferences);
    preferenceInf.push(userPreferences[0]);
  }

  // ID list of preference meals
  const prefMealIDs = [];
  await prefFoodSearch(preferenceInf[0]).then((apiResponse) => {
    prefMealIDs.push(apiResponse);
  });
  await prefFoodSearch(preferenceInf[1]).then((apiResponse) => {
    prefMealIDs.push(apiResponse);
  });
  await prefFoodSearch(preferenceInf[2]).then((apiResponse) => {
    prefMealIDs.push(apiResponse);
  });
  await prefFoodSearch(preferenceInf[3]).then((apiResponse) => {
    prefMealIDs.push(apiResponse);
  });
  await prefFoodSearch(preferenceInf[4]).then((apiResponse) => {
    prefMealIDs.push(apiResponse);
  });
  await prefFoodSearch(preferenceInf[5]).then((apiResponse) => {
    prefMealIDs.push(apiResponse);
  });
  await prefFoodSearch(preferenceInf[6]).then((apiResponse) => {
    prefMealIDs.push(apiResponse);
  });

  // Combination of two list
  const weeklyMealsIDs = [];
  weeklyMealsIDs.push(
    ...shuffleArray([randomMealIDs[0], randomMealIDs[1], prefMealIDs[0]])
  );
  weeklyMealsIDs.push(
    ...shuffleArray([randomMealIDs[2], randomMealIDs[3], prefMealIDs[1]])
  );
  weeklyMealsIDs.push(
    ...shuffleArray([randomMealIDs[4], randomMealIDs[5], prefMealIDs[2]])
  );
  weeklyMealsIDs.push(
    ...shuffleArray([randomMealIDs[6], randomMealIDs[7], prefMealIDs[3]])
  );
  weeklyMealsIDs.push(
    ...shuffleArray([randomMealIDs[8], randomMealIDs[9], prefMealIDs[4]])
  );
  weeklyMealsIDs.push(
    ...shuffleArray([randomMealIDs[10], randomMealIDs[11], prefMealIDs[5]])
  );
  weeklyMealsIDs.push(
    ...shuffleArray([randomMealIDs[12], randomMealIDs[13], prefMealIDs[6]])
  );

  const weeklyPlan = [];
  await foodInformation(weeklyMealsIDs[0]).then((apiResponse) => {
    weeklyPlan.push(apiResponse);
  });
  await foodInformation(weeklyMealsIDs[1]).then((apiResponse) => {
    weeklyPlan.push(apiResponse);
  });
  await foodInformation(weeklyMealsIDs[2]).then((apiResponse) => {
    weeklyPlan.push(apiResponse);
  });
  await foodInformation(weeklyMealsIDs[3]).then((apiResponse) => {
    weeklyPlan.push(apiResponse);
  });
  await foodInformation(weeklyMealsIDs[4]).then((apiResponse) => {
    weeklyPlan.push(apiResponse);
  });
  await foodInformation(weeklyMealsIDs[5]).then((apiResponse) => {
    weeklyPlan.push(apiResponse);
  });
  await foodInformation(weeklyMealsIDs[6]).then((apiResponse) => {
    weeklyPlan.push(apiResponse);
  });
  await foodInformation(weeklyMealsIDs[7]).then((apiResponse) => {
    weeklyPlan.push(apiResponse);
  });
  await foodInformation(weeklyMealsIDs[8]).then((apiResponse) => {
    weeklyPlan.push(apiResponse);
  });
  await foodInformation(weeklyMealsIDs[9]).then((apiResponse) => {
    weeklyPlan.push(apiResponse);
  });
  await foodInformation(weeklyMealsIDs[10]).then((apiResponse) => {
    weeklyPlan.push(apiResponse);
  });
  await foodInformation(weeklyMealsIDs[11]).then((apiResponse) => {
    weeklyPlan.push(apiResponse);
  });
  await foodInformation(weeklyMealsIDs[12]).then((apiResponse) => {
    weeklyPlan.push(apiResponse);
  });
  await foodInformation(weeklyMealsIDs[13]).then((apiResponse) => {
    weeklyPlan.push(apiResponse);
  });
  await foodInformation(weeklyMealsIDs[14]).then((apiResponse) => {
    weeklyPlan.push(apiResponse);
  });
  await foodInformation(weeklyMealsIDs[15]).then((apiResponse) => {
    weeklyPlan.push(apiResponse);
  });
  await foodInformation(weeklyMealsIDs[16]).then((apiResponse) => {
    weeklyPlan.push(apiResponse);
  });
  await foodInformation(weeklyMealsIDs[17]).then((apiResponse) => {
    weeklyPlan.push(apiResponse);
  });
  await foodInformation(weeklyMealsIDs[18]).then((apiResponse) => {
    weeklyPlan.push(apiResponse);
  });
  await foodInformation(weeklyMealsIDs[19]).then((apiResponse) => {
    weeklyPlan.push(apiResponse);
  });
  await foodInformation(weeklyMealsIDs[20]).then((apiResponse) => {
    weeklyPlan.push(apiResponse);
  });

  const mealPlan = {
    monBreakfast: weeklyPlan[0],
    monLunch: weeklyPlan[1],
    monDinner: weeklyPlan[2],
    tueBreakfase: weeklyPlan[3],
    tueLunch: weeklyPlan[4],
    tueDinner: weeklyPlan[5],
    wedBreakfase: weeklyPlan[6],
    wedLunch: weeklyPlan[7],
    wedDinner: weeklyPlan[8],
    thuBreakfase: weeklyPlan[9],
    thuLunch: weeklyPlan[10],
    thuDinner: weeklyPlan[11],
    friBreakfase: weeklyPlan[12],
    friLunch: weeklyPlan[13],
    friDinner: weeklyPlan[14],
    satBreakfase: weeklyPlan[15],
    satLunch: weeklyPlan[16],
    satDinner: weeklyPlan[17],
    sunBreakfase: weeklyPlan[18],
    sunLunch: weeklyPlan[19],
    sunDinner: weeklyPlan[20],
  };

  req.user.currentPlan = mealPlan;
  req.user.save();
  return response(res, 200, 'Weekly plan generated.', {
    userPlan: req.user.currentPlan,
  });
};

// Get meal plan of certain date
const getDailyMealPlan = async (req, res) => {
  const userMealPlan = req.user.currentPlan;
  const date = req.body;
  let meals;

  switch (date) {
    case '1':
      meals = {
        breakfast: userMealPlan[0],
        lunch: userMealPlan[1],
        dinner: userMealPlan[2],
      };
      break;
    case '2':
      meals = {
        breakfast: userMealPlan[3],
        lunch: userMealPlan[4],
        dinner: userMealPlan[5],
      };
      break;
    case '3':
      meals = {
        breakfast: userMealPlan[6],
        lunch: userMealPlan[7],
        dinner: userMealPlan[8],
      };
      break;
    case '4':
      meals = {
        breakfast: userMealPlan[9],
        lunch: userMealPlan[10],
        dinner: userMealPlan[11],
      };
      break;
    case '5':
      meals = {
        breakfast: userMealPlan[12],
        lunch: userMealPlan[13],
        dinner: userMealPlan[14],
      };
      break;
    case '6':
      meals = {
        breakfast: userMealPlan[15],
        lunch: userMealPlan[16],
        dinner: userMealPlan[17],
      };
      break;
    case '7':
      meals = {
        breakfast: userMealPlan[18],
        lunch: userMealPlan[19],
        dinner: userMealPlan[20],
      };
      break;
    default:
      return response(res, 400, 'Wrong body format.');
  }
  return response(res, 200, 'Daily plan got.', {
    plan: meals,
  });
};

module.exports = {
  signUp,
  logIn,
  logOut,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  generateMealPlan,
  addMultiplePreference,
  addMultipleAllergies,
  getCurrentUserPreferences,
  getCurrentUserAllergies,
  getDailyMealPlan,
};
