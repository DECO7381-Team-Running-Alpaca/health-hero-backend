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
  addmultiplePreference,
  addmultipleAllergies,
} = require('../controllers/user');

const validator = require('../middlewares/validator');

const router = new express.Router();

// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: 'Health Hero Back-end Database',
//       version: '1.0.0',
//     },
//   },
//   apis: ['../index.js'],
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);

/**
 * @swagger
 * components:
 *  schema:
 *  User:
 *    type: object
 *    required:
 *      - user_name
 *      - password
 *      - email
 *      - height
 *      - weight
 *    properties:
 *      id:
 *        type: string
 *        description: An auto generated id of a user
 *      user_name:
 *        type: string
 *        description: User name
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

// Update current user
router.patch('/users/me', validator, updateCurrentUser);

// Delete current user
router.delete('/users/me', validator, deleteCurrentUser);

// Remove a preference from a user
router.delete('/users/preferences/:p_name', validator, removePreference);

// Remove an allergy from a user
router.delete('/users/allergies/:a_name', validator, removeAllergy);

// Generate meal plan
router.post('/users/meal', validator, generateMealPlan);

// Add multiple preferences
router.post('/users/preferences', validator, addmultiplePreference);

// Add multiple allergies
router.post('/users/allergies', validator, addmultipleAllergies);
module.exports = router;
