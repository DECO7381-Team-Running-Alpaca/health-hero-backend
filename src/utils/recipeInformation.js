const request = require('request');

const apiKey = 'apiKey=d4b93e5298f94c61a475342f985b1d10';

const foodInformation = (id, callback) => {
  const url = `https://api.spoonacular.com/recipes/
  ${encodeURIComponent(id)}/information?includeNutrition=false
  &apiKey=${encodeURIComponent(apiKey)}`;

  request({ url, json: true }, (error, response) => {
    const data = response.body;

    if (error) {
      callback('Could you please turn on your WiFi?', undefined);
    } else if (data.length === 0) {
      callback("Nothing found, I'm very sure that it's your fault.", undefined);
    } else {
      callback(undefined, {
        sourceURL: data.sourceURL,
        dishTypes: data.dishTypes,
        ingredients: data.extendedIngredients,
      });
    }
  });
};

module.exports = foodInformation;
