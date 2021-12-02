const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const boom = require('@hapi/boom');
const helmet = require('helmet');
const cors = require('cors');

const indexRouter = require('./routes/views/index');
const productRouter = require('./routes/views/product');
const apiProductRouter = require('./routes/api/products');
const apiAuthRouter = require('./routes/api/auth');
const isDevelopment = require('./utils/middlewares/isDevelopment');

const {
  logsError,
  wrapError,
  errorClientHandler,
  errorHandler,
} = require('./utils/middlewares/ErrorHandler');
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

//route view
indexRouter(app);
productRouter(app);

//route api
apiProductRouter(app);
apiAuthRouter(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  if (isRequestAjaxOrApi(req)) {
    next(boom.notFound('not found'));
  }
  res.status(404).render('404');
});

app.use(logsError);
app.use(wrapError);
app.use(errorClientHandler);
app.use(errorHandler);

module.exports = app;
