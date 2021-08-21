const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  p_name: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true,
  }
});

const Preference = mongoose.model('Preference', preferenceSchema);

module.exports = Preference;
