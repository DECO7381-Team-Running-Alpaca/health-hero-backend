module.exports = (res, code, message, data) => {
  res.status(code).send({
    status: code < 300 ? 'success' : 'error',
    message,
    data,
  });
};
