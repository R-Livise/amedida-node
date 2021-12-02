exports.success = function (req, res, data, message, status) {
  let statusCode = status || 200;
  let statusMessage = message || '';

  return res.status(statusCode).json({
    data,
    messaje: statusMessage,
  });
};
