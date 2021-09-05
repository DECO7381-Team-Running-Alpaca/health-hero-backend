const express = require('express');
const {
  viewAllergy,
  addNewAllergy,
  viewAllAllergies,
  deleteAllergy,
} = require('../controllers/allergy');

const router = new express.Router();

// Add a new allergy
router.post('/allergies', addNewAllergy);

// View a allergy
router.get('/allergies/:a_name', viewAllergy);

// View all allergies
router.get('/allergies/all', viewAllAllergies);

// Delete a allergy
// eslint-disable-next-line consistent-return
router.delete('/allergies/:a_name', deleteAllergy);

module.exports = router;
