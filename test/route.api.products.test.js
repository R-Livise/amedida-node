const assert = require('assert');
const proxyquire = require('proxyquire');

const {
  productsMock,
  ProductsServiceMock,
} = require('../utils/mocks/products');

const testServer = require('../utils/serverTest');

describe('routes - api - products', function () {
  const route = proxyquire('../routes/api/products', {
    '../../service/product': ProductsServiceMock,
  });

  const request = testServer(route);

  describe('GET /products', function () {
    it('should respond with status 200', function (done) {
      request.get('/api/product').expect(200, done);
    });

    it('should respond with content type JSON', function (done) {
      request
        .get('/api/product')
        .expect('Content-type', /json/, done);
    });

    it('should respond with not error', function (done) {
      request.get('/api/product').end((err, res) => {
        assert.strictEqual(err, null);
        done();
      });
    });

    it('should respond with the product list', function (done) {
      request.get('/api/product').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: productsMock,
          messaje: 'products list',
        });
        done();
      });
    });
  });
});
