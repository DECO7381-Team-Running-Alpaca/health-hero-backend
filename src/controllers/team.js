const TEAM = require('../models/team');

const getMembers = (req, res) => res.status(201).send(TEAM);
const addMember = (req, res) => res.status(201);
const updateMemberById = (req, res) => res.status(201);
const deleteMemberById = (req, res) => res.status(201);

module.exports = {
  getMembers,
  addMember,
  updateMemberById,
  deleteMemberById,
};
