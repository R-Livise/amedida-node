const { mongo: { database, host, password, port, user }} = require('../config'); // prettier-ignore
const MONGO_URI = `mongodb+srv://${user}:${password}@${host}/${database}`;

const debug = require('debug')('app:mongo');
const db = require('mongoose');
const Schema = require('../utils/schema/mongo/factorySchema');

db.Promise = global.Promise;

class Mongo {
  constructor() {
    this.connect(MONGO_URI);
  }

  static getDatabase() {
    if (!this.DB) this.DB = new Mongo();
    return this.DB;
  }

  async connect(url) {
    try {
      await db.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      debug('[db] Conexion con exito');
    } catch (error) {
      debug('[Error db] Conexion fallida', url);
    }

    db.connection.on('error', err => {
      logError(err);
      db.disconnect();
      this.DB;
      debug('[Error db] Base de datos deconectada');
    });
  }

  async getAll(table, query) {
    debug('query', query);
    return Schema(table).find(query).exec();
  }
  async get(table, id) {
    return Schema(table).findById(id);
  }
  async save(table, data) {
    let foundUser = await this.get(table, data.id);

    if (!foundUser) return await Schema(table).create(data);

    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key) && key !== 'id') {
        foundUser[key] = data[key];
      }
    }

    return await foundUser.save();
  }
  async delete(table, id) {
    let foundUser = await this.get(table, id);

    if (!foundUser) return await Schema(table).delete(data);
  }
}

module.exports = Mongo;
