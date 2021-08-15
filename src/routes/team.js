const express = require('express');
const {
  getMembers,
  addMember,
  updateMemberById,
  deleteMemberById,
} = require('../controllers/team');

const teamRouter = express.Router();

// TODO: add ID validator middleware
teamRouter.get('', getMembers);
teamRouter.post('', addMember);
teamRouter.put('/:id', updateMemberById);
teamRouter.delete('/:id', deleteMemberById);

module.exports = teamRouter;
