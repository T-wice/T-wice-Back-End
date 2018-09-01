const mariadb = require('mariadb');

exports.connect = async () => {
  const connection = await mariadb.createConnection({
    host     : '35.221.106.237',
    user     : 'root',
    password : '',
    database : 'twice'
  });
  try {
    return await connection.connect();
  } catch(err) {
    throw new Error('database connection error', err);
  }
}