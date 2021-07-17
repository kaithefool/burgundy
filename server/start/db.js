const mysql = require('mysql2/promise');

const { env } = process;

module.exports = mysql.createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  multipleStatements: true,
});
