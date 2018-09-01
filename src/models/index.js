const mariadb = require('mariadb');

exports.connect = async () => {
  try {
    const connection = await mariadb.createConnection({
    host     : '35.221.106.237',
    user     : 'root',
    password : '',
    database : 'twice'
  });
    return connection;
  } catch(err) {
    throw new Error('database connection error', err);
  }
}