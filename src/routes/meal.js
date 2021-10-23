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
 * /meal:
 *   post:
 *     security:
 *       -bearerAuth: []
 *     summary: generate a plan
 *     tags: [Meal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           examples:
 * 
 *             meal:
 *                summary: meal
 *                value:
 *                  preference: [a,b,c,d]
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

/**
 * @swagger
 * /meal/all:
 *   post:
 *     security:
 *       -bearerAuth: []
 *     summary: getAllMeals
 *     tags: [Meal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           examples:
 * 
 *             meal:
 *                summary: meal
 *                value:
 *                  date: [1,2,3,4,5,6,7]
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
router.get('/meal/all', validator, globalCathMW(getAllMeals));

/**
 * @swagger
 * /meal/date:
 *   post:
 *     security:
 *       -bearerAuth: []
 *     summary: getDailyMealPlan
 *     tags: [Meal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           examples:
 * 
 *             meal:
 *                summary: meal
 *                value:
 *                  date: [1]
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
router.post('/meal/date', validator, globalCathMW(getDailyMealPlan));

/**
 * @swagger
 * /meal/data:
 *   post:
 *     security:
 *       -bearerAuth: []
 *     summary: getDailyMealData
 *     tags: [Meal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           examples:
 * 
 *             meal:
 *                summary: meal
 *                value:
 *                  date: [1]
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
router.post('/meal/data', validator, globalCathMW(getDailyMealData));

/**
 * @swagger
 * /meal/twodays:
 *   post:
 *     security:
 *       -bearerAuth: []
 *     summary: getTodayAndTomorrow
 *     tags: [Meal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           examples:
 * 
 *             meal:
 *                summary: meal
 *                value:
 *                  date: [1]
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
router.post('/meal/twodays', validator, globalCathMW(getTodayAndTomorrow));
/**
 * @swagger
 * /meal/random:
 *   get:
 *     security:
 *       -bearerAuth: []
 *     summary: get random meal plan
 *     tags: [Meal]
 *     requestBody:
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
router.get('/meal/random', getRandomMeal);
module.exports = router;
