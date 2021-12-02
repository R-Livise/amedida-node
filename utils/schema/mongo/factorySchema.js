const products = require('./products');
const users = require('./users');
const apiKeys = require('./apiKeys');

function factoryDB(option) {
  switch (option) {
    case 'products':
      return products;
    case 'users':
      return users;
    case 'api-keys':
      return apiKeys;
    default:
      throw new Error('no existe este esquema');
  }
}

module.exports = factoryDB;
