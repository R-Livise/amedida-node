const chalk = require('chalk');
const crypto = require('crypto');
const debug = require('debug')('app:scripts:api-keys');
const { factoryLib, optionsLib } = require('../../lib/factoryLib');
const TABLE = 'api-keys';

const adminScopes = [
  'signin:auth',
  'signup:auth',
  'read:movies',
  'create:movies',
  'update:movies',
  'delete:movies',
  'read:user-movies',
  'create:user-movies',
  'delete:user-movies',
];

const publicScopes = [
  'signin:auth',
  'signup:auth',
  'read:movies',
  'read:user-movies',
  'create:user-movies',
  'delete:user-movies',
];

const apiKeys = [
  {
    token: generateRandomToken(),
    scopes: adminScopes,
  },
  {
    token: generateRandomToken(),
    scopes: publicScopes,
  },
];

function generateRandomToken() {
  const buffer = crypto.randomBytes(32);
  return buffer.toString('hex');
}

async function seedApiKeys() {
  try {
    const store = factoryLib(optionsLib.MONGO);

    const promises = apiKeys.map(async apiKey => {
      await store.save('api-keys', apiKey);
    });

    await Promise.all(promises);

    debug(chalk.green(`${promises.length} api keys have been created succesfully`)); // prettier-ignore

    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedApiKeys();
