const express = require('express');
// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUI = require('swagger-ui-express');

const {
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  signUp,
  logIn,
  logOut,
  removePreference,
  removeAllergy,
  generateMealPlan,
  addMultiplePreference,
  addMultipleAllergies,
  getCurrentUserPreferences,
  getCurrentUserAllergies,
} = require('../controllers/user');

const validator = require('../middlewares/validator');

const router = new express.Router();

/**
 * @swagger
 *  components:
 *    securitySchemes:
 *      Bearer:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - user_name
 *          - password
 *          - email
 *          - height
 *          - weight
 *          - preferences
 *          - allergies
 *          - current_plan
 *        properties:
 *          id:
 *            type: string
 *            description: the auto-generated id of the user
 *          preferences:
 *            type: arrary
 *            description: the preferences of the user
 *          allergies:
 *            type: arrary
 *            description: the allergies of the user
 *          user_name:
 *            type: string
 *            description: the name of the user
 *          password:
 *            type: string
 *            description: the password of the user
 *          email:
 *            type: string
 *            description: the email of the user
 *          weight:
 *            type: number
 *            description: the weight of the user
 *          height:
 *            type: number
 *            description: the height of the user
 *          current_plan:
 *            type: arrary
 *            description: the current plan of the user
 *        example:
 *          id: sdawesadafa213saf3f23dsadg3r4tglzp12
 *          preferences: [a,b]
 *          allergies: [c.f]
 *          user_name: zhang_san
 *          password: 123qwe!!!
 *          email: 123@qwe.com
 *          weight: 50
 *          height: 151
 *          current_plan: [a,b,c,d,e,f]
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     security:
 *       -bearerAuth: []
 *     summary: Returen the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: success!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/User'
 *               example: {id: 123qwe, preferences: a, allergies: b, user_name: zhang_san, password: 123qwe!!!, email: 123@123.com, height: 88, weight: 50}
 *       400:
 *          description: Bad Request
 *       401:
 *          description: UnAuthorized
 */
const globalCathMW = (controller) => (req, res, next) => {
  Promise.resolve(controller(req, res, next)).catch(next);
}; 
// Sign up
router.post('/users', globalCathMW(signUp));

// Log in
router.post('/users/login', logIn);

// Logout
router.post('/users/logout', validator, logOut);

// Get current user
router.get('/users/me', validator, getCurrentUser);

/**
 * @swagger
 * /users/me:
 *   patch:
 *     security:
 *       -bearerAuth: []
 *     summary: Update the users
 *     tags: [Users]
 *     parameters:
 *       - in: user
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *           minimum: 6
 *         description: The current password of current user
 *       - in: user
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           minimum: 6
 *         description: The current email of current user
 *       - in: user
 *         name: height
 *         required: true
 *         schema:
 *           type: number
 *           minimum: 2
 *         description: The current height of current user
 *       - in: user
 *         name: weight
 *         required: true
 *         schema:
 *           type: number
 *           minimum: 2
 *         description: The current weight of current user
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

// Update current user
router.patch('/users/me', validator, updateCurrentUser);

/**
 * @swagger
 * /users/me:
 *   delete:
 *     security:
 *       -bearerAuth: []
 *     summary: delete the users
 *     tags: [Users]
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
// Delete current user
router.delete('/users/me', validator, deleteCurrentUser);
/**
 * @swagger
 * /users/preferences/:p_name:
 *   delete:
 *     security:
 *       -bearerAuth: []
 *     summary: delete the prefernce of users
 *     tags: [Users]
 *     parameters:
 *       - in: user
 *         name: preference
 *         required: true
 *         schema:
 *           type: string
 *           minimum: 2
 *         description: The preference should be deleted of current user
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

// Remove a preference from a user
router.delete('/users/preferences/:p_name', validator, removePreference);

/**
 * @swagger
 * /users/allergies/:a_name:
 *   delete:
 *     security:
 *       -bearerAuth: []
 *     summary: delete the allergy of users
 *     tags: [Users]
 *     parameters:
 *       - in: user
 *         name: allergy
 *         required: true
 *         schema:
 *           type: string
 *           minimum: 2
 *         description: The allergy should be deleted of current user
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

// Remove an allergy from a user
router.delete('/users/allergies/:a_name', validator, removeAllergy);
/**
 * @swagger
 * /users/meal:
 *   post:
 *     security:
 *       -bearerAuth: []
 *     summary: generate a plan
 *     tags: [Users]
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
// Generate meal plan
router.post('/users/meal', validator, generateMealPlan);

/**
 * @swagger
 * /users/preferences:
 *   post:
 *     security:
 *       -bearerAuth: []
 *     summary: Add multiple preferences
 *     tags: [Users]
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
router.patch('/users/preferences', validator, addMultiplePreference);

/**
 * @swagger
 * /users/allergies:
 *   post:
 *     security:
 *       -bearerAuth: []
 *     summary: Add multiple allergies
 *     tags: [Users]
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
router.patch('/users/allergies', validator, addMultipleAllergies);

/**
 * @swagger
 * /users/getPref:
 *   get:
 *     security:
 *       -bearerAuth: []
 *     summary: Returen the users'preferences
 *     tags: [Users]
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
router.get('/users/getPref', validator, getCurrentUserPreferences);

/**
 * @swagger
 * /users/getAllergies:
 *   get:
 *     security:
 *       -bearerAuth: []
 *     summary: Returen the users'allergies
 *     tags: [Users]
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
router.get('/users/getAllergies', validator, getCurrentUserAllergies);

module.exports = router;
