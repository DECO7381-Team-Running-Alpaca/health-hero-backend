const express = require('express');
const {
  addNewPreference,
  viewPreference,
  viewAllPreference,
  deletePreference,
} = require('../controllers/preference');

const router = new express.Router();

// Add a new preference
router.post('/preferences', addNewPreference);

// View a preference
router.get('/preferences/:p_name', viewPreference);

// View all preferences
router.get('/preferences/all', viewAllPreference);

// Delete a preference
router.delete('/preferences/:p_name', deletePreference);

module.exports = router;
