const express = require('express');

const {
  addMultiplePreference,
  addMultipleAllergies,
  getCurrentUserPreferences,
  getCurrentUserAllergies,
} = require('../controllers/customised');

const validator = require('../middlewares/validator');

const router = new express.Router();

const globalCathMW = (controller) => (req, res, next) => {
  Promise.resolve(controller(req, res, next)).catch(next);
};

/**
 * @swagger
 * /users/preferences:
 *   post:
 *     security:
 *       -bearerAuth: []
 *     summary: Add multiple preferences
 *     tags: [Preference]
 *     parameters:
 *       - in: user
 *         name: preferences
 *         required: true
 *         schema:
 *           type: arrary
 *           minimum: 2
 *         description: The prefernces should be added into current user
 *     responses:
 *       200:
 *         description: success!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/User'
 *               enum: [a, b, c, d, new]
 *               example: [a,b,c]
 *       400:
 *          description: Bad Request
 *       401:
 *          description: UnAuthorized
 */
// Add multiple preferences
router.patch('/preferences', validator, globalCathMW(addMultiplePreference));

/**
 * @swagger
 * /users/allergies:
 *   post:
 *     security:
 *       -bearerAuth: []
 *     summary: Add multiple allergies
 *     tags: [Allergy]
 *     parameters:
 *       - in: user
 *         name: allergies
 *         required: true
 *         schema:
 *           type: arrary
 *           minimum: 2
 *         description: The allergies should be added into current user
 *     responses:
 *       200:
 *         description: success!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/User'
 *               enum: [a, b, c, d, new]
 *               example: [a,b,c]
 *       400:
 *          description: Bad Request
 *       401:
 *          description: UnAuthorized
 */
// Add multiple allergies
router.patch('/allergies', validator, globalCathMW(addMultipleAllergies));

/**
 * @swagger
 * /users/getPref:
 *   get:
 *     security:
 *       -bearerAuth: []
 *     summary: Returen the users'preferences
 *     tags: [Allergy]
 *     responses:
 *       200:
 *         description: success!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/User'
 *               num: [a, b, c, d, new]
 *               example: [a,b,c]
 *       400:
 *          description: Bad Request
 *       401:
 *          description: UnAuthorized
 */
// Get current user's preferences
router.get('/preferences', validator, globalCathMW(getCurrentUserPreferences));

/**
 * @swagger
 * /users/getAllergies:
 *   get:
 *     security:
 *       -bearerAuth: []
 *     summary: Returen the users'allergies
 *     tags: [Preference]
 *     responses:
 *       200:
 *         description: success!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/User'
 *               num: [a, b, c, d, new]
 *               example: [a,b,c]
 *       400:
 *          description: Bad Request
 *       401:
 *          description: UnAuthorized
 */
// Get current user's allergies
router.get('/allergies', validator, globalCathMW(getCurrentUserAllergies));

module.exports = router;
