const config = require('../../config');
const debug = require('debug')('app:error');
const boom = require('@hapi/boom');
const isRequestAjaxOrApi = require('../isRequestAjaxOrApi');

function withErrorStack(error, stack, data) {
  if (config.dev) {
    return { ...error, stack };
  }
  return error;
}

function logsError(err, req, res, next) {
  debug(err.stack);
  next(err);
}

function wrapError(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation());
  } else {
    next(err);
  }
}

function errorClientHandler(err, req, res, next) {
  const {
    data,
    output: { statusCode, payload },
  } = err;

  if (data) {
    payload.data = data;
  }
  if (isRequestAjaxOrApi(req)) {
    res.status(statusCode).json(withErrorStack(payload, err.stack));
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  debug('err.isBoom', 'errorHandler', req.random, err.isBoom);
  const {
    output: { statusCode, payload },
  } = err;

  res.status(statusCode);
  res.render('error', withErrorStack(payload, err.stack));
}

module.exports = {
  logsError,
  wrapError,
  errorClientHandler,
  errorHandler,
};
