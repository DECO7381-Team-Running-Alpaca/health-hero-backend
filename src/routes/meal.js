const express = require('express');

const {
  generateMealPlan,
  getAllMeals,
  getDailyMealPlan,
  getDailyMealData,
  getTodayAndTomorrow,
  getRandomMeal,
} = require('../controllers/meal');

const validator = require('../middlewares/validator');

const router = new express.Router();

const globalCathMW = (controller) => (req, res, next) => {
  Promise.resolve(controller(req, res, next)).catch(next);
};

/**
 * @swagger
 * /users/meal:
 *   post:
 *     security:
 *       -bearerAuth: []
 *     summary: generate a plan
 *     tags: [Meal]
 *     parameters:
 *       - in: user
 *         name: food
 *         required: true
 *         schema:
 *           type: arrary
 *           minimum: 2
 *         description: The food should be added into current user
 *     responses:
 *       200:
 *         description: success!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *          description: Bad Request
 *       401:
 *          description: UnAuthorized
 */
router.post('/meal', validator, globalCathMW(generateMealPlan));

router.get('/meal/all', validator, globalCathMW(getAllMeals));

router.post('/meal/date', validator, globalCathMW(getDailyMealPlan));

router.post('/meal/data', validator, globalCathMW(getDailyMealData));

router.post('/meal/twodays', validator, globalCathMW(getTodayAndTomorrow));

router.get('/meal/get', getRandomMeal);
module.exports = router;
