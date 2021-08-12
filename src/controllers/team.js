const Team = require('../models/team');
const TEAM = require('../models/team');

const getMembers = (req, res) =>
  res.status(201).send({ message: 'Fetch Successfully', TEAM });

const addMember = (req, res) => {
  const { name, id } = req.body;
  const newMember = { name, id };

  TEAM.push(newMember);
  res.status(201).send({ message: 'Team member added!', TEAM });
};

const updateMemberById = (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;

  const memberIndex = TEAM.find((member) => member.id === id);
  if (memberIndex < 0) {
    res.status(400).send({ error: 'Member Not Found!' });
  }

  TEAM[memberIndex] = { name: newName, id };
  res
    .status(200)
    .send({ message: 'Member Updated!', member: TEAM[memberIndex] });
};

const deleteMemberById = (req, res) => {
  const { id } = req.params;
  const memberIndex = TEAM.find((member) => member.id === id);
  if (memberIndex < 0) {
    res.status(400).send({ error: 'Member Not Found!' });
  }

  const deleteMember = Team.splice(memberIndex, 1);
  res.status(200).send({ message: 'Post Deleted!', deleteMember });
};

module.exports = {
  getMembers,
  addMember,
  updateMemberById,
  deleteMemberById,
};
