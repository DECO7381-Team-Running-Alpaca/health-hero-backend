const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const {
  signUp,
  logIn,
  logOut,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  addPreference,
  removePreference,
  getCurrentUserPreferences,
  addAllergy,
  removeAllergy,
  getCurrentUserAllergies,
  generateMealPlan,
  addmultiplePreference,
} = require('../controllers/user');

const validator = require('../middlewares/validator');

const router = new express.Router();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Health Hero Back-end Database',
      version: '1.0.0',
    },
  },
  apis: ['../index.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

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

// Sign up
router.post('/users', signUp);

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

// Add a preference to current user by p_name
router.post('/users/preferencesp_name', validator, addPreference);

// Remove a preference from a user
router.delete('/users/preferences/:p_name', validator, removePreference);

// Get all preferences from a user
router.get('/users/preferences/', validator, getCurrentUserPreferences);

// Add an allergy to current user by a_name
router.post('/users/allergies/:a_name', validator, addAllergy);

// Remove an allergy from a user
router.delete('/users/allergies/:a_name', validator, removeAllergy);

// Get all allergies from a user
router.get('/users/allergies/', validator, getCurrentUserAllergies);

// Generate meal plan
router.post('/users/meal', validator, generateMealPlan);

// Add multiple preferences

router.post('/users/preferences', validator, addmultiplePreference);

module.exports = router;
