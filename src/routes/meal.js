const express = require('express');

const {
  generateMealPlan,
  getAllMeals,
  getDailyMealPlan,
  getDailyMealData,
  getTodayAndTomorrow,
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

module.exports = router;
