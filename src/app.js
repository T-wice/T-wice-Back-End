const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const database = require('./models');

const routes = require('./routes');
require('dotenv').config();

const app = express();

app.use(bodyparser.urlencoded({
  extended: false
}));

app.use(bodyparser.json());
app.use(morgan('dev'));

// app.use('/', routes);

app.listen(process.env.PORT || 8080, () => {
  // database();
  console.log('port on 8080');
})