const mysql = require('mysql2/promise');

require('./env');

const { DB } = process.env;

module.exports = mysql.createPool({
  host: DB.HOST,
  user: DB.USER,
  database: DB.DATABASE,
  multipleStatements: true,
});
