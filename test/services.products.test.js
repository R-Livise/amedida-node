const assert = require('assert');
const proxyquire = require('proxyquire');

const {
  factoryMongoLibMock,
  getAllStub,
  saveStub,
  tagQuery,
} = require('../utils/mocks/mongoLib');

const {
  productsMock,
  filteredProductsMock,
} = require('../utils/mocks/products');

describe.only('service - product', function () {
  const ProductService = proxyquire('../service/product', {
    '../lib/factoryLib': factoryMongoLibMock,
  });
  const productService = new ProductService();
  describe('when getProducts called', async function () {
    it('should call the getAll MongoLib method', async function () {
      await productService.getProducts({});

      assert.strictEqual(getAllStub.called, true);
    });
    it('should return list products', async function () {
      const actual = await productService.getProducts({});
      const expected = productsMock;
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe('when getProducts called with tags', async function () {
    it('should call the getAll MongoLib method', async function () {
      await productService.getProducts({ tags: ['expensive'] });
      assert.strictEqual(
        getAllStub.calledWith('product', tagQuery),
        true
      );
    });
    it('should return list products filter by tags', async function () {
      const actual = await productService.getProducts({
        tags: ['expensive'],
      });
      const expected = filteredProductsMock('expensive');
      assert.deepStrictEqual(actual, expected);
    });
  });
});
