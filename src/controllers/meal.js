/* eslint-disable no-param-reassign */
const response = require('../utils/resFormatter');
const randomFoodSearch = require('../utils/randomFoodTitle');
const prefFoodSearch = require('../utils/preferenceFoodTitle');
const foodInformation = require('../utils/recipeInformation');
const instruction = require('../utils/instructions');
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
  //   const userAllergies = req.user.allergies;

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

  const mealPlan = [
    weeklyPlan[0],
    weeklyPlan[1],
    weeklyPlan[2],
    weeklyPlan[3],
    weeklyPlan[4],
    weeklyPlan[5],
    weeklyPlan[6],
    weeklyPlan[7],
    weeklyPlan[8],
    weeklyPlan[9],
    weeklyPlan[10],
    weeklyPlan[11],
    weeklyPlan[12],
    weeklyPlan[13],
    weeklyPlan[14],
    weeklyPlan[15],
    weeklyPlan[16],
    weeklyPlan[17],
    weeklyPlan[18],
    weeklyPlan[19],
    weeklyPlan[20],
  ];

  req.user.current_plan = mealPlan;
  req.user.save();
  return response(res, 200, 'Weekly plan generated.', {
    userPlan: mealPlan,
  });
};

// Get meal plan of certain date
const getDailyMealPlan = async (req, res) => {
  const userMealPlan = req.user.current_plan;
  const { date } = req.body;
  let meals;

  switch (date) {
    case '1':
      meals = {
        todayBreakfast: userMealPlan[0],
        todayLunch: userMealPlan[1],
        todayDinner: userMealPlan[2],
      };
      break;
    case '2':
      meals = {
        todayBreakfast: userMealPlan[3],
        todayLunch: userMealPlan[4],
        todayDinner: userMealPlan[5],
      };
      break;
    case '3':
      meals = {
        todayBreakfast: userMealPlan[6],
        todayLunch: userMealPlan[7],
        todayDinner: userMealPlan[8],
      };
      break;
    case '4':
      meals = {
        todayBreakfast: userMealPlan[9],
        todayLunch: userMealPlan[10],
        todayDinner: userMealPlan[11],
      };
      break;
    case '5':
      meals = {
        todayBreakfast: userMealPlan[12],
        todayLunch: userMealPlan[13],
        todayDinner: userMealPlan[14],
      };
      break;
    case '6':
      meals = {
        todayBreakfast: userMealPlan[15],
        todayLunch: userMealPlan[16],
        todayDinner: userMealPlan[17],
      };
      break;
    case '7':
      meals = {
        todayBreakfast: userMealPlan[18],
        todayLunch: userMealPlan[19],
        todayDinner: userMealPlan[20],
      };
      break;
    default:
      return response(res, 400, 'Wrong body format.');
  }
  return response(res, 200, 'Daily plan got.', {
    plan: meals,
  });
};

// Get all meals
const getAllMeals = async (req, res) => {
  return response(res, 200, 'Weekly plan got.', {
    plan: req.user.current_plan,
  });
};

// Get meal plan of certain date
const getDailyMealData = async (req, res) => {
  const userMealPlan = req.user.current_plan;
  const { date } = req.body;
  let meals;

  switch (date) {
    case '1':
      meals = {
        breakfast: userMealPlan[0][0].title,
        breakfastCalories: userMealPlan[0][0].nutrients.calories,
        lunch: userMealPlan[1][0].title,
        lunchCalories: userMealPlan[1][0].nutrients.calories,
        dinner: userMealPlan[2][0].title,
        dinnerCalories: userMealPlan[2][0].nutrients.calories,
      };
      break;
    case '2':
      meals = {
        breakfast: userMealPlan[3][0].title,
        breakfastCalories: userMealPlan[3][0].nutrients.calories,
        lunch: userMealPlan[4][0].title,
        lunchCalories: userMealPlan[4][0].nutrients.calories,
        dinner: userMealPlan[5][0].title,
        dinnerCalories: userMealPlan[5][0].nutrients.calories,
      };
      break;
    case '3':
      meals = {
        breakfast: userMealPlan[6][0].title,
        breakfastCalories: userMealPlan[6][0].nutrients.calories,
        lunch: userMealPlan[7][0].title,
        lunchCalories: userMealPlan[7][0].nutrients.calories,
        dinner: userMealPlan[8][0].title,
        dinnerCalories: userMealPlan[8][0].nutrients.calories,
      };
      break;
    case '4':
      meals = {
        breakfast: userMealPlan[9][0].title,
        breakfastCalories: userMealPlan[9][0].nutrients.calories,
        lunch: userMealPlan[10][0].title,
        lunchCalories: userMealPlan[10][0].nutrients.calories,
        dinner: userMealPlan[11][0].title,
        dinnerCalories: userMealPlan[11][0].nutrients.calories,
      };
      break;
    case '5':
      meals = {
        breakfast: userMealPlan[12][0].title,
        breakfastCalories: userMealPlan[12][0].nutrients.calories,
        lunch: userMealPlan[13][0].title,
        lunchCalories: userMealPlan[13][0].nutrients.calories,
        dinner: userMealPlan[14][0].title,
        dinnerCalories: userMealPlan[14][0].nutrients.calories,
      };
      break;
    case '6':
      meals = {
        breakfast: userMealPlan[15][0].title,
        breakfastCalories: userMealPlan[15][0].nutrients.calories,
        lunch: userMealPlan[16][0].title,
        lunchCalories: userMealPlan[16][0].nutrients.calories,
        dinner: userMealPlan[17][0].title,
        dinnerCalories: userMealPlan[17][0].nutrients.calories,
      };
      break;
    case '7':
      meals = {
        breakfast: userMealPlan[18][0].title,
        breakfastCalories: userMealPlan[18][0].nutrients.calories,
        lunch: userMealPlan[19][0].title,
        lunchCalories: userMealPlan[19][0].nutrients.calories,
        dinner: userMealPlan[20][0].title,
        dinnerCalories: userMealPlan[20][0].nutrients.calories,
      };
      break;
    default:
      return response(res, 400, 'Wrong body format.');
  }
  return response(res, 200, 'Daily plan got.', {
    plan: meals,
  });
};

// Get meal plan of certain date
const getTodayAndTomorrow = async (req, res) => {
  const userMealPlan = req.user.current_plan;
  const { date } = req.body;
  const generateInfo = (checker) => {
    const iDate = (parseInt(checker, 10) - 1) * 3;
    const tDate = iDate === 18 ? 0 : iDate + 3;
    const todayBreakName = userMealPlan[iDate][0].title;
    const todayBreakImage = userMealPlan[iDate][0].image;
    const todayLunchName = userMealPlan[iDate + 1][0].title;
    const todayLunchImage = userMealPlan[iDate + 1][0].image;
    const todayDinnerName = userMealPlan[iDate + 2][0].title;
    const todayDinnerImage = userMealPlan[iDate + 2][0].image;
    const tomorrowBreakName = userMealPlan[tDate][0].title;
    const tomorrowBreakImage = userMealPlan[tDate][0].image;
    const tomorrowLunchName = userMealPlan[tDate + 1][0].title;
    const tomorrowLunchImage = userMealPlan[tDate + 1][0].image;
    const tomorrowDinnerName = userMealPlan[tDate + 2][0].title;
    const tomorrowDinnerImage = userMealPlan[tDate + 2][0].image;
    return [
      [todayBreakName, todayBreakImage],
      [todayLunchName, todayLunchImage],
      [todayDinnerName, todayDinnerImage],
      [tomorrowBreakName, tomorrowBreakImage],
      [tomorrowLunchName, tomorrowLunchImage],
      [tomorrowDinnerName, tomorrowDinnerImage],
    ];
  };

  const result = generateInfo(date);
  const meals = {
    todayBreakfast: {
      title: result[0][0],
      image: result[0][1],
    },
    todayLunch: {
      title: result[1][0],
      image: result[1][1],
    },
    todayDinner: {
      title: result[2][0],
      image: result[2][1],
    },
    tomorrorBreakfast: {
      title: result[3][0],
      image: result[3][1],
    },
    tomorrowLunch: {
      title: result[4][0],
      image: result[4][1],
    },
    tomorrowDinner: {
      title: result[5][0],
      image: result[5][1],
    },
  };

  return response(res, 200, 'Daily plan got.', {
    plan: meals,
  });
};

const num = Math.floor(Math.random() * 6) + 1;
const RandomMeal = [
  instruction.subInstruct1,
  instruction.subInstruct2,
  instruction.subInstruct3,
  instruction.subInstruct4,
  instruction.subInstruct5,
  instruction.subInstruct6,
];
// returen a random meal
const getRandomMeal = async (req, res) => {
  return response(res, 200, 'Random Meal got.', RandomMeal[num]);
};

module.exports = {
  generateMealPlan,
  getDailyMealData,
  getDailyMealPlan,
  getAllMeals,
  getTodayAndTomorrow,
  getRandomMeal,
};
