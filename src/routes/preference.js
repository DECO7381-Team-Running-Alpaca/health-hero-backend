const express = require('express');
const Preference = require('../models/preference');

const router = new express.Router();

// Add a new preference
// eslint-disable-next-line consistent-return
router.post('/preferences', async (req, res) => {
  const preference = new Preference(req.body);
  console.log(preference);

  try {
    const existPreference = await Preference.findOne({
      p_name: preference.p_name,
    });
    if (existPreference) {
      return res
        .status(400)
        .send('Preference insert failed. Preference has existed.');
    }

    preference.save();

    res.status(201).send({
      message: 'Preference Created!',
      preference,
    });
  } catch (error) {
    res.status(400).send({
      message: 'Please make sure that body is well organized.',
      error,
    });
  }
});

// View a preference
router.get('/preferences/:p_name', async (req, res) => {
  try {
    const preference = await Preference.findOne({ p_name: req.param.p_name });

    if (!preference) {
      res.statuss(404).send({
        message: 'Preference not found.',
      });
    }

    res.send(preference);
  } catch (error) {
    res.status(500).send({
      message: 'Unexpected Error.',
    });
  }
});

// View all preferences
router.get('/preferences/all', async (req, res) => {
  const preferences = await Preference.find({});
  res.send(preferences);
});

// Delete a preference
// eslint-disable-next-line consistent-return
router.delete('/preferences/:p_name', async (req, res) => {
  try {
    const preference = await Preference.findOneAndDelete({
      p_name: req.param.p_name,
    });

    if (!preference) {
      return res.status(400).send({
        message: 'Preference not found.',
      });
    }

    res.send({
      message: 'Preference deleted.',
      preference,
    });
  } catch (error) {
    res.status(400).send({
      message: 'Delete Failed.',
    });
  }
});

module.exports = router;
