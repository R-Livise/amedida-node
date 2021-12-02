const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { factoryLib, optionsLib } = require('../../../lib/factoryLib');

passport.use(
  new BasicStrategy(async function (username, password, cb) {
    try {
      const store = factoryLib(optionsLib.MONGO);

      const [user] = await store.getAll('users', { username });

      if (!user) {
        return cb(boom.unauthorized(), false);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false);
      }

      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  })
);
