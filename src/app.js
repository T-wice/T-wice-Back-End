const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const database = require('./models').connect;

const routes = require('./routes');

const app = express();

app.use(bodyparser.urlencoded({
  extended: false
}));

app.use(bodyparser.json());
app.use(morgan('dev'));

app.use('/', routes);

app.listen(process.env.PORT || 8080, () => {
  database();
  console.log(`port on ${process.env.PORT}`);
})