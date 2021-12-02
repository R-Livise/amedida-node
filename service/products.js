const { factoryLib, optionsLib } = require('../lib/factoryLib');

class ProductService {
  constructor() {
    this.store = factoryLib(optionsLib.MONGO);
    this.table = 'products';
  }

  async getProducts({ tags }) {
    const query = tags && { tags: { $in: tags } };
    return this.store.getAll(this.table, query);
  }

  async getProduct(id) {
    return this.store.get(this.table, id);
  }

  async createProduct(data) {
    return this.store.save(this.table, data);
  }

  async updateProduct(data) {
    return this.store.save(this.table, data);
  }

  async deleteProduct(id) {
    return this.store.delete(this.table, id);
  }
}

module.exports = ProductService;
