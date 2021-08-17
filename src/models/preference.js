const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  p_name: {
    
  }
});

const Preference = mongoose.model('Preference', preferenceSchema);

module.exports = Preference;
