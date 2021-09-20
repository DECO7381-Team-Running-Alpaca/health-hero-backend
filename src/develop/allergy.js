/* eslint-disable consistent-return */
const Allergy = require('../models/allergy');

// Add a new allergy
const addNewAllergy = async (req, res) => {
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
};

// View an allergy
const viewAllergy = async (req, res) => {
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
};

// View all allergies
const viewAllAllergies = async (req, res) => {
  const allergies = await Allergy.find({});
  res.send(allergies);
};

// Delete an allergy
const deleteAllergy = async (req, res) => {
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
};

module.exports = {
  addNewAllergy,
  viewAllergy,
  viewAllAllergies,
  deleteAllergy,
};
