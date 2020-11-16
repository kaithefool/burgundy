const mysql = require('mysql2/promise');

const { db: { driver, ...db } } = require('./env');

module.exports = mysql.createPool(db);
