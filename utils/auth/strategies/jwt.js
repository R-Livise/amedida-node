const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const boom = require('@hapi/boom');
const { factoryLib, optionsLib } = require('../../../lib/factoryLib');
const JwtSecret = require('../../../config').auth.JwtSecret;
const store = factoryLib(optionsLib.MONGO);

passport.use(
  new Strategy(
    {
      secretOrKey: JwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (tokenPayload, cb) {
      try {
        const user = await store.get('users', tokenPayload.sub);

        if (!user) {
          return cb(boom.unauthorized(), false);
        }

        delete user.password;

        return cb(null, { ...user, scopes: tokenPayload.scopes });
      } catch (error) {
        return cb(error);
      }
    }
  )
);
