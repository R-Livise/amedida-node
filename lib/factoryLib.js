const Mongo = require('./mongoLib');
const Mock = require('./mockLib');

function factoryLib(option) {
  switch (option) {
    case 'MYSQL':
      break;
    case 'MONGO':
      return Mongo.getDatabase();
    case 'MOCK':
      return Mock.getDatabase();
    default:
      throw new Error('no existe la base de datos');
  }
}
const optionsLib = {
  MONGO: 'MONGO',
  MYSQL: 'MYSQL',
  MOCK: 'MOCK',
};
module.exports = { factoryLib, optionsLib };
