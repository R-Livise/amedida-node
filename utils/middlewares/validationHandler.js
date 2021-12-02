const joi = require('@hapi/joi');
const debug = require('debug')('app:validation');
const boom = require('@hapi/boom');

async function validation(data, schema) {
  // const { error } = joi.object(schema).validate(data);

  // const errors = {};
  // if (error) {
  //   error.details.forEach(({ context, message }) => {
  //     errors[context.key] = message.replace(/"\w+"/, '').trim();
  //   });
  // }
  // return errors !== {} ? errors : null;
  try {
    await joi.object(schema).validateAsync(data);
  } catch (error) {
    const errors = {};
    error.details.forEach(({ context, message }) => {
      errors[context.key] = message.replace(/"\w+"/, '').trim();
    });
    throw boom.notAcceptable('', errors);
  }
}

function validationHandeler(schema, data = 'body') {
  return function (req, res, next) {
    validation(req[data], schema).catch(error => {
      next(error);
    });

    next();
  };
}

module.exports = validationHandeler;
