const mysql = require('mysql2/promise');

const { db } = require('./env');

module.exports = mysql.createPool(db);
