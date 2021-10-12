const axios = require('axios').default;

const foodInformation = async (id) => {
  const apiKey = '86b3a96f57c149df83551cd3a481adcc';
  const url = `https://api.spoonacular.com/recipes/${encodeURIComponent(
    id
  )}/information?apiKey=${encodeURIComponent(apiKey)}&includeNutrition=false`;
  try {
    const apiResponse = await axios.get(url);
    const info = apiResponse.data;

    const { title, extendedIngredients, instructions, sourceUrl, image } = info;
    const ingredients = [];
    extendedIngredients.forEach((element) => {
      ingredients.push(element.name);
    });
    return {
      title,
      ingredients,
      instructions,
      sourceUrl,
      image,
    };
  } catch (error) {
    return error;
  }
};

module.exports = foodInformation;
