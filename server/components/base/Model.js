const Schema = require('./Schema');

module.exports = class Model {
  constructor(s, ...args) {
    this.schema = typeof s === 'string'
      ? new Schema(s, ...args) : s;
  }

  get model() {
    return this.schema.model;
  }

  aggregate() {}

  find() {}

  count() {}

  insert() {}

  upsert() {}

  update() {}

  delete() {}
};
