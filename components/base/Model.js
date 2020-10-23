const db = require('../../start/db');

class Model {
  constructor(table) {
    this.db = db;
    this.table = table;
  }

  select() {}

  insert() {}

  update() {}

  delete() {}
}

module.exports = Model;
