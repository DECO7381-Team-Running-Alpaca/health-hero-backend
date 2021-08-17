const mongoose = require('mongoose');

const allergySchema = new mongoose.Schema({
  a_name: {
    
  }
});

const Allergy = mongoose.model('Preference', allergySchema);

module.exports = Allergy;
