const express = require('express');
const {
  getMembers,
  addMember,
  updateMemberById,
  deleteMemberById,
} = require('../controllers/team');

const router = express.Router();

// TODO: add ID validator middleware
router.get('', getMembers);
router.post('', addMember);
router.put('/:id', updateMemberById);
router.delete('/:id', deleteMemberById);

module.exports = router;
