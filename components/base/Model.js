const db = require('../../start/db');

class Model {
  constructor() {
    this.db = db;
  }
}

module.exports = Model;
