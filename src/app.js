const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const database = require('./models').connect;
const routes = require('./routes');

const app = express();

app.use('/static', express.static(path.join(__dirname, '../resources')));

app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(bodyparser.json());
app.use(morgan('dev'));

app.use('/', routes);

app.listen(process.env.PORT || 8080, () => {
  database();
  console.log(`port on ${process.env.PORT}`);
})