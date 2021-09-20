const express = require('express');
// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUI = require('swagger-ui-express');

const {
  addPreference,
  getCurrentUserPreferences,
  addAllergy,
  getCurrentUserAllergies,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
} = require('../develop/dev');

const validator = require('../middlewares/validator');

const router = new express.Router();

// Get current user
router.get('/dev/me', validator, getCurrentUser);
// Update current user
router.patch('/dev/me', validator, updateCurrentUser);
// Delete current user
router.delete('/dev/me', validator, deleteCurrentUser);
// Add a preference to current user by p_name
router.post('/dev/preferencesp_name', validator, addPreference);
// Get all preferences from a user
router.get('/dev/preferences/', validator, getCurrentUserPreferences);
// Add an allergy to current user by a_name
router.post('/dev/allergies/:a_name', validator, addAllergy);
// Get all allergies from a user
router.get('/dev/allergies/', validator, getCurrentUserAllergies);

// eslint-disable-next-line no-undef
module.exports = router;
