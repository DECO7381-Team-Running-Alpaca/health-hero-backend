// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).send({
      message: error.message,
    });
  }
  console.log(error);
  return res.status(500).send({
    message: 'Request fail for unknown reason.',
  });
};
