const chalk = require('chalk');
const debug = require('debug')('app:scripts:products');
const { factoryLib, optionsLib } = require('../../lib/factoryLib');
const TABLE = 'products';

const products = require('../../utils/mocks/products').productsMock;

async function seedApiKeys() {
  try {
    const store = factoryLib(optionsLib.MONGO);

    const promises = products.map(async product => {
      await store.save(TABLE, product);
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
