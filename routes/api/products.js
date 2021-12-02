const express = require('express');
const passport = require('passport');
const response = require('../../utils/res/response');
const ProductService = require('../../service/products');

const validation = require('../../utils/middlewares/validationHandler');
const validationScopeHandler = require('../../utils/middlewares/vaidationScopeHandler');
const cacheResponse = require('../../utils/middlewares/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('./../../utils/time');

const {
  createProjectSchema,
  projectIdSchema,
  projectTagSchema,
  updateProjetSchema,
} = require('../../utils/schema/joi/products');

//jwt strategy autentification

require('../../utils/auth/strategies/jwt');

module.exports = function (app) {
  const router = express.Router();
  app.use('/api/products', router);

  const productService = new ProductService();

  router.get(
    '/',
    validation({ tags: projectTagSchema }, 'query'),
    validationScopeHandler(['read:products']),
    cacheResponse(FIVE_MINUTES_IN_SECONDS),
    function (req, res, next) {
      productService
        .getProducts(req.query)
        .then(data => {
          response.success(req, res, data, 'products list', 200);
        })
        .catch(next);
    }
  );

  router.get(
    '/:id',
    validation({ id: projectIdSchema }, 'params'),
    validationScopeHandler(['read:products']),
    cacheResponse(SIXTY_MINUTES_IN_SECONDS),
    function (req, res, next) {
      productService
        .getProduct(req.params.id)
        .then(data => {
          response.success(req, res, data, 'product', 200);
        })
        .catch(next);
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validationScopeHandler(['create:products']),
    validation(createProjectSchema),
    function (req, res, next) {
      productService
        .createProduct(req.body)
        .then(data => {
          response.success(req, res, data, 'create product', 201);
        })
        .catch(next);
    }
  );

  router.patch(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    validation(projectIdSchema, 'params'),
    validationScopeHandler(['update:products']),
    validation(updateProjetSchema),
    function (req, res, next) {
      productService
        .updateProduct(req.body)
        .then(data => {
          response.success(req, res, data, 'edit product', 200);
        })
        .catch(next);
    }
  );

  router.delete(
    '/:id',
    validation(projectIdSchema, 'params'),
    validationScopeHandler(['delete:products']),
    function (req, res, next) {
      productService
        .deleteProduct(req.params.id)
        .then(data => {
          response.success(req, res, data, 'delete list', 200);
        })
        .catch(next);
    }
  );
};
