const mysql = require('mysql2/promise');

require('./env');

const { db } = process.env;

module.exports = mysql.createPool(db);
