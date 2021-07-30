const Schema = require('./Schema');

module.exports = class Model {
  constructor(s, ...args) {
    this.schema = typeof s === 'string'
      ? new Schema(s, ...args) : s;
  }

  get model() {
    return this.schema.model;
  }

  setter(v) {
    return v;
  }

  // use setter to parse inputs
  // before create and update
  async parse(docs, action) {
    const values = await Promise.all(
      docs.map((d) => this.setter(d, action)),
    );

    return values;
  }

  aggregate(...args) {
    return this.model.aggregate(...args);
  }

  find({
    filter = {},
    sort,
    skip = 0,
    limit = 10,
    select,
  }) {
    const q = this.model.find(filter);

    if (sort) q.sort(sort);
    if (skip) q.skip(skip);
    if (limit) q.limit(limit);
    if (select) q.select(select);

    return q;
  }

  count(filter) {
    return this.model.countDocuments(filter);
  }

  async create(docs) {
    const created = await this.model.create(
      await this.parse(docs, 'create'),
    );

    return created;
  }

  async update(filter, docs, opts) {
    const updated = await this.model.update(
      filter,
      await this.parse(docs, 'update'),
      opts,
    );

    return updated;
  }

  delete(filter, by, softDelete = true) {
    const { model } = this;

    // soft delete
    if (softDelete && model.softDelete) {
      return model.softDelete(filter, by);
    }

    // hard delete
    return model.deleteMany(filter);
  }
};
