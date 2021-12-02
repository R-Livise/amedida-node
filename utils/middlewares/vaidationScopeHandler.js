const boom = require('@hapi/boom');

function validationScopeHandler(allowedScopes) {
  return function (req, res, next) {
    if (!req.user || (req.user && !req.user.scopes)) {
      next(boom.unauthorized('Missing scopes'));
    }
    const hasScope = allowedScopes
      .map(allowedScope => req.user.scopes.includes(allowedScope))
      .find(allowed => Boolean(allowed));

    if (hasScope) {
      next();
    } else {
      next(boom.unauthorized('insuficient scope'));
    }
  };
}

module.exports = validationScopeHandler;
