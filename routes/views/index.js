var express = require('express');
var router = express.Router();

module.exports = function (api) {
  const router = express.Router();
  api.use('/', router);
  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
  });
};
