const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validator = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'healthhero');
    const user = await User.findOne({
      // eslint-disable-next-line no-underscore-dangle
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({
      message: 'Authentification failed. Please contact Tony~',
    });
  }
};

module.exports = validator;
