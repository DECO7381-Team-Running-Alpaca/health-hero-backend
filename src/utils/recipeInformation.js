const axios = require('axios').default;

const foodInformation = async (id) => {
  const apiKey = process.env.API_KEY;
  const url = `https://api.spoonacular.com/recipes/${encodeURIComponent(
    id
  )}/information?apiKey=${encodeURIComponent(apiKey)}&includeNutrition=true`;
  try {
    const apiResponse = await axios.get(url);
    const info = apiResponse.data;

    const {
      title,
      extendedIngredients,
      instructions,
      sourceUrl,
      image,
      nutrition,
    } = info;
    const ingredients = [];
    extendedIngredients.forEach((element) => {
      ingredients.push(element.name);
    });
    const nutrients = {
      calories: nutrition.nutrients[0].amount,
      fat: nutrition.nutrients[1].amount,
      saturatedFat: nutrition.nutrients[2].amount,
      carbohydrates: nutrition.nutrients[3].amount,
      netCarbohydrates: nutrition.nutrients[4].amount,
      sugar: nutrition.nutrients[5].amount,
      cholesterol: nutrition.nutrients[6].amount,
    };

    // // 1: chrome/postman
    // const videoUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    //   title
    // )}&key=${encodeURIComponent(process.env.VIDEO_KEY)}`;
    // const videoResponse = await axios.get(videoUrl);
    // console.log(videoResponse);
    // // 2. destruct
    // const { videoId } = videoResponse.items[0].id;

    return {
      title,
      ingredients,
      instructions,
      sourceUrl,
      image,
      nutrients,
      // videoId,
    };
  } catch (error) {
    return error;
  }
};

module.exports = foodInformation;
