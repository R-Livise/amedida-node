const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const debug = require('debug')('app:api:auth');

const JwtSecret = require('../../config').auth.JwtSecret;
const response = require('../../utils/res/response');
const validation = require('../../utils/middlewares/validationHandler');
const {
  createProjectSchema,
} = require('../../utils/schema/joi/users');

const UsersService = require('../../service/users');
const ApiKeysService = require('../../service/apiKeys');

require('../../utils/auth/strategies/basic');

module.exports = function (api) {
  const router = express.Router();
  api.use('/api/auth', router);

  const apiKeysService = new ApiKeysService();
  const usersService = new UsersService();

  router.post('/sign-in', async function (req, res, next) {
    const { apiKeyToken } = req.body;

    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required'));
      return false;
    }

    passport.authenticate('basic', function (error, user) {
      try {
        if (error || !user) {
          return next(boom.unauthorized('Unauthorized'));
        }

        req.login(user, { session: false }, async function (error) {
          if (error) {
            return next(error);
          }

          const apiKey = await apiKeysService.getApiKey({
            token: apiKeyToken,
          });

          if (!apiKey) {
            return next(boom.unauthorized());
          }

          const { _id: id, username, email } = user;

          const payload = {
            sub: id,
            email,
            username,
            scopes: apiKey.scopes,
          };

          debug(payload);
          const token = jwt.sign(payload, JwtSecret, {
            expiresIn: '15m',
          });

          return res
            .status(200)
            .json({ token, user: { id, username, email } });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post(
    '/sign-up',
    validation(createProjectSchema),
    async function (req, res, next) {
      usersService
        .createUser(req.body)
        .then(data => {
          response.success(req, res, data, 'New user created', 201);
        })
        .catch(next);
    }
  );
};
