const request = require('request');

const apiKey = '15eac1d9f7be4a208037a9f6be0e9112';

const foodInformation = (id, callback) => {
  const url = `https://api.spoonacular.com/recipes/${encodeURIComponent(
    id
  )}/information?apiKey=${encodeURIComponent(apiKey)}&includeNutrition=false`;

  request({ url, json: true }, (error, response) => {
    const data = response.body;

    if (error) {
      callback('Could you please turn on your WiFi?', undefined);
    }
    if (data.length === 0) {
      callback("Nothing found, I'm very sure that it's your fault.", undefined);
    }

    const ingredients = [];
    data.extendedIngredients.forEach((ingre) => {
      ingredients.push(ingre.name);
    });
    callback(undefined, {
      title: data.title,
      ingres: ingredients,
      instruct: data.instructions,
      sourceUrl: data.sourceUrl,
      image: data.image,
    });
  });
};

module.exports = foodInformation;
