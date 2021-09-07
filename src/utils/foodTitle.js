const request = require('request');

const apiKey = 'd4b93e5298f94c61a475342f985b1d10';

const foodSearch = (query, callback) => {
  const url = `https://api.spoonacular.com/recipes/complexSearch?
  apiKey=${encodeURIComponent(apiKey)}
  &query=${encodeURIComponent(query)}
  &number=${1}`;

  request({ url, json: true }, (error, response) => {
    const data = response.body.results;

    if (error) {
      callback('Could you please turn on your WiFi?', undefined);
    } else if (data.length === 0) {
      callback("Nothing found, I'm very sure that it's your fault.", undefined);
    } else {
      callback(undefined, {
        title: data[0].title,
        calories: data[0].calories,
      });
    }
  });
};

module.exports = foodSearch;
