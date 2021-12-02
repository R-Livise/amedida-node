const mock = require('../utils/mocks');
const debug = require('debug')('app:mockLib');

class Mock {
  constructor() {
    this.mock = mock;
  }

  static getDatabase() {
    if (!this.DB) this.DB = new Mock();

    debug('user MOCK');
    return this.DB;
  }

  async getAll(table, q) {
    if (q) {
      let col = await this.get(table);
      let keys = Object.keys(q);
      let key = keys[0];
      return col.filter(item => item[key] === q[key])[0] || null;
    }
    return this.mock[table];
  }
  async get(table, id) {
    return this.mock[table].filter(item => item.id === id)[0] || null;
  }
  async save(table, data) {
    if (!this.mock[table]) {
      this.mock[table] = [];
    }
    let col = await this.getAll(table);
    let index = col.findIndex(item => item.id == data.id);

    if (index >= 0) {
      col.splice(index, 1, data);
      await get(table, data.id);
    } else {
      col.push(data);
    }
  }
  async delete(table, id) {
    let col = await getAll(table);

    const index = col.findIndex(item => item.id == id);

    if (index >= 0) {
      return col.splice(index, 1);
    }
    return { id };
  }
}
// static set DB(Database) {
//   Mock.DatabasePrivate=Database;
// }

// constructor(table){
//   this.table= mock[table] || {}
// }

// static getDatabase(table){
//   if(!Object.keys(this.DB).includes(table)){
//     const newtable={}
//     newtable[table]=new Mock(table)
//     Mock.DB = Object.assign(Mock.DB,newtable)
//   }
//   return Mock.DB[table]
// }

module.exports = Mock;
