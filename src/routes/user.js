const express = require('express');

const {
  signUp,
  logIn,
  logOut,
  logOutAll,
  getAllUser,
  getCurrentUser,
  updateUserByUsername,
  updateCurrentUser,
  deleteUserByUsername,
  deleteCurrentUser,
  addPreference,
  removePreference,
  getCurrentUserPreferences,
  addAllergy,
  removeAllergy,
  getCurrentUserAllergies,
} = require('../controllers/user');

const validator = require('../middlewares/validator');

const router = new express.Router();

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

// Logout All
router.post('/users/logout_all', validator, logOutAll);

// Get all users
router.get('/users/all', getAllUser);

// Get current user
router.get('/users/me', validator, getCurrentUser);

// Update current user by username
router.patch('/users/dev/:user_name', updateUserByUsername);

// Update current user
router.patch('/users/me', validator, updateCurrentUser);

// Delete a user by username
router.delete('/users/dev/:user_name', deleteUserByUsername);

// Delete current user
router.delete('/users/me', validator, deleteCurrentUser);

// Add a preference to current user by p_name
router.post('/users/preferences/:p_name', validator, addPreference);

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

module.exports = router;
