const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : '35.221.106.237',
  user     : 'root',
  password : '',
  database : 'twice'
});

exports.connect = () => {
  return connection.connect(function(err) {
    if (err) {
      throw new Error(err);
    } else {
      console.log('connection database');
    }
  });
}