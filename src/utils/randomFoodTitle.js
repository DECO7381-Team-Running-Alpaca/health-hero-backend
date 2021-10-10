/* eslint-disable no-param-reassign */
const request = require('request');

const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
};

const foodSearch = (number, callback) => {
  const apiKey = '15eac1d9f7be4a208037a9f6be0e9112';
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${encodeURIComponent(
    apiKey
  )}&number=${number}`;

  request({ url, json: true }, (err, res) => {
    const data = res.body.results;

    if (err) {
      callback('Could you please turn on your WiFi?', err);
    }
    if (data.length === 0) {
      callback("Nothing found, I'm very sure that it's your fault.", undefined);
    }

    shuffleArray(data);
    let mealIDs = [];
    data.forEach((meal) => {
      mealIDs.push(meal.id);
    });
    mealIDs = mealIDs.slice(0, 14);

    callback(undefined, {
      ids: mealIDs,
    });
  });
};

module.exports = foodSearch;
