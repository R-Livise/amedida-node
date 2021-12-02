const bcrypt = require('bcrypt');
const { factoryLib, optionsLib } = require('../lib/factoryLib');
const boom = require('@hapi/boom');

class UserService {
  constructor() {
    this.store = factoryLib(optionsLib.MONGO);
    this.table = 'users';
  }

  async getUsers({ username }) {
    const query = username && { username: { $in: username } };
    return this.store.getAll(this.table, query);
  }

  async getUser(id) {
    return this.store.get(this.table, id);
  }

  async createUser(data) {
    try {
      data.password = await bcrypt.hash(data.password, 10);

      const { _id } = await this.store.save(this.table, data);
      return { id: _id };
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000)
        throw boom.notAcceptable(
          `${Object.keys(error.keyValue)[0]} already exists`
        );

      throw boom.notAcceptable('username or email already exists');
    }
  }

  async updateUser(data) {
    return this.store.save(this.table, data);
  }

  async deleteUser(id) {
    return this.store.delete(this.table, id);
  }
}

module.exports = UserService;
