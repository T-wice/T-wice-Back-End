const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'password',
  database : 'twice'
});

exports.connect = () => {
  connection.connect(function(err) {
    if (err) {
      throw new Error(err);
    } else {
      console.log('connection database');
    }
  });
}