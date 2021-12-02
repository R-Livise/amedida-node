const { productsMock, filteredProductsMock } = require('./products');
const sinon = require('sinon');

const getAllStub = sinon.stub();
const tagQuery = { tags: { $in: ['expensive'] } };

getAllStub.withArgs('product').resolves(productsMock);
getAllStub
  .withArgs('product', tagQuery)
  .resolves(filteredProductsMock('expensive'));

const saveStub = sinon.stub().resolves('159a6s3d1a6a46ad');

class MongoLibMock {
  getAll(table, query) {
    return getAllStub(table, query);
  }

  save(table, data) {
    return saveStub(table, data);
  }
}

const factoryMongoLibMock = {
  factoryLib: option => {
    return new MongoLibMock();
  },
  optionsLib: {
    MONGO: 'MONGO',
    MYSQL: 'MYSQL',
    MOCK: 'MOCK',
  },
};
module.exports = {
  factoryMongoLibMock,
  getAllStub,
  saveStub,
  tagQuery,
};
