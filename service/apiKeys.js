const { factoryLib, optionsLib } = require('../lib/factoryLib');

class ApiKeysService {
  constructor() {
    this.store = factoryLib(optionsLib.MONGO);
    this.collection = 'api-keys';
  }

  async getApiKey({ token }) {
    const [apiKey] = await this.store.getAll(this.collection, {
      token,
    });
    return apiKey;
  }
}

module.exports = ApiKeysService;
