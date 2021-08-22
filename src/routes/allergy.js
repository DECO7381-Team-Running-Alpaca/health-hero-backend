const express = require('express');
const Allergy = require('../models/allergy');

const router = new express.Router();

// Add a new allergy
// eslint-disable-next-line consistent-return
router.post('/allergies', async (req, res) => {
  const allergy = new Allergy(req.body);

  try {
    const existPreference = await Allergy.findOne({
      a_name: allergy.a_name,
    });
    if (existPreference) {
      return res
        .status(400)
        .send('Allergy insert failed. Allergy has existed.');
    }

    allergy.save();

    res.status(201).send({
      message: 'Allergy Created!',
      allergy,
    });
  } catch (error) {
    res.status(400).send({
      message: 'Please make sure that body is well organized.',
      error,
    });
  }
});

// View a allergy
router.get('/allergies/:a_name', async (req, res) => {
  try {
    const allergy = await Allergy.findOne({ a_name: req.param.a_name });

    if (!allergy) {
      res.statuss(404).send({
        message: 'Allergy not found.',
      });
    }

    res.send(allergy);
  } catch (error) {
    res.status(500).send({
      message: 'Unexpected Error.',
    });
  }
});

// View all allergies
router.get('/allergies/all', async (req, res) => {
  const allergies = await Allergy.find({});
  res.send(allergies);
});

// Delete a allergy
// eslint-disable-next-line consistent-return
router.delete('/allergies/:a_name', async (req, res) => {
  try {
    const allergy = await Allergy.findOneAndDelete({
      a_name: req.param.a_name,
    });

    if (!allergy) {
      return res.status(400).send({
        message: 'Allergy not found.',
      });
    }

    res.send({
      message: 'Allergy deleted.',
      allergy,
    });
  } catch (error) {
    res.status(400).send({
      message: 'Delete Failed.',
    });
  }
});

module.exports = router;
