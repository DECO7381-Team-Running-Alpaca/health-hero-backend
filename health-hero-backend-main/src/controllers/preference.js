/* eslint-disable consistent-return */
const Preference = require('../models/user');

// Add a new preference
const addNewPreference = async (req, res) => {
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
};

// View a preference
const viewPreference = async (req, res) => {
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
};

// View all preference
const viewAllPreference = async (req, res) => {
  const preferences = await Preference.find({});
  res.send(preferences);
};

// Delete a preference
const deletePreference = async (req, res) => {
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
};

module.exports = {
  addNewPreference,
  viewPreference,
  viewAllPreference,
  deletePreference,
};
