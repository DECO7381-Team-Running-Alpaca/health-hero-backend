const mongoose = require('mongoose');

const weeklyPlanSchema = new mongoose.Schema({});

// eslint-disable-next-line func-names
weeklyPlanSchema.pre('save', async function (next) {
  // TO DO: validation

  next();
});

const WeeklyPlan = mongoose.model('Food-preference', weeklyPlanSchema);

module.exports = WeeklyPlan;
