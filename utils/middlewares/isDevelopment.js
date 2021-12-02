const config = require('../../config');
function isDevelopment(req, res, next) {
  res.locals.dev = config.dev;
  next();
}

module.exports = isDevelopment;
