const express = require('express');

const {
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  signUp,
  logIn,
  logOut,
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
 * tags:
 *   name: Preference
 *   description: The users'preference managing API
 */

/**
 * @swagger
 * tags:
 *   name: Allergy
 *   description: The users'allergies managing API
 */

/**
 * @swagger
 * tags:
 *   name: Meal
 *   description: The users'allergies managing API
 */

const globalCathMW = (controller) => (req, res, next) => {
  Promise.resolve(controller(req, res, next)).catch(next);
};

/**
 * @swagger
 * /users:
 *   post:
 *     security:
 *       -bearerAuth: []
 *     summary: Sign up
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
 *               example: {id: 123qwe, user_name: a123sad, token: 50}
 *       400:
 *          description: Bad Request
 *       401:
 *          description: UnAuthorized
 */
// Sign up
router.post('/users', globalCathMW(signUp));

/**
 * @swagger
 * /users/login:
 *   post:
 *     security:
 *       -bearerAuth: []
 *     summary: Log in
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
 *               example: {id: 123qwe, user_name: a123sad, token: 50}
 *       400:
 *          description: Bad Request
 *       401:
 *          description: UnAuthorized
 */
// Log in
router.post('/users/login', globalCathMW(logIn));

/**
 * @swagger
 * /users/logout:
 *   post:
 *     security:
 *       -bearerAuth: []
 *     summary: Log out
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
 *               example: {id: 123qwe, user_name: a123sad, token: 50}
 *       400:
 *          description: Bad Request
 *       401:
 *          description: UnAuthorized
 */
// Logout
router.post('/users/logout', validator, globalCathMW(logOut));

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
// Get current user
router.get('/users/me', validator, globalCathMW(getCurrentUser));

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
router.patch('/users/me', validator, globalCathMW(updateCurrentUser));

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
router.delete('/users/me', validator, globalCathMW(deleteCurrentUser));

module.exports = router;
