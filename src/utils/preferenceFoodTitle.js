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

const randomFoodSearch = (query, callback) => {
  const apiKey = '15eac1d9f7be4a208037a9f6be0e9112';
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${encodeURIComponent(
    apiKey
  )}&query=${encodeURIComponent(query)}&number=${20}`;

  request({ url, json: true }, (err, res) => {
    const data = res.body.results;
    console.log(data);

    if (err) {
      callback('Could you please turn on your WiFi?', err);
    }
    if (data.length === 0) {
      callback("Nothing found, I'm very sure that it's your fault.", undefined);
    }

    shuffleArray(data);
    callback(undefined, {
      id: data[0].id,
    });
  });
};

module.exports = randomFoodSearch;
