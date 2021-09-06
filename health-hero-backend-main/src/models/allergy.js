const mongoose = require('mongoose');

const allergySchema = new mongoose.Schema({
  a_name: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
});

const Allergy = mongoose.model('Allergy', allergySchema);

module.exports = Allergy;
