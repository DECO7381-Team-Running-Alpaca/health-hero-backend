/* eslint-disable no-param-reassign */
// const request = require('request');

const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
};
const axios = require('axios').default;

const randomFoodSearch = async () => {
  const apiKey = '86b3a96f57c149df83551cd3a481adcc';
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${encodeURIComponent(
    apiKey
  )}&number=100`;
  try {
    const apiResponse = await axios.get(url);
    const data = apiResponse.data.results;
    const ids = [];
    data.forEach((element) => {
      ids.push(element.id);
    });
    shuffleArray(ids);
    return ids.slice(0, 14);
  } catch (error) {
    return error;
  }
};

module.exports = randomFoodSearch;
