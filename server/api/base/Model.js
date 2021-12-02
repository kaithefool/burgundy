const Schema = require('./Schema');

class Model {
  constructor(s, ...args) {
    this.schema = typeof s === 'string'
      ? new Schema(s, ...args) : s;

    this.model = this.schema.model;
  }

  setter(v) {
    return v;
  }

  matcher(filter) {
    if (this.model.softDelete) {
      return {
        ...filter,
        deletedAt: null,
      };
    }

    return filter;
  }

  // use setter to parse inputs
  // before create and update
  async parse(docs, userId, action) {
    // insert timestamp by
    const setter = userId
      ? async (...args) => {
        const d = await this.setter(...args);

        d[`${action}dBy`] = userId;

        return d;
      } : this.setter;

    const values = Array.isArray(docs)
      ? await Promise.all(
        docs.map((d) => setter(d, action)),
      )
      : await setter(docs, action);

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
    const q = this.model.find(this.matcher(filter));

    if (sort) q.sort(sort);
    if (skip) q.skip(parseInt(skip, 10));
    if (limit) q.limit(parseInt(limit, 10));
    if (select) q.select(select);

    return q;
  }

  count(filter) {
    return this.model.countDocuments(this.matcher(filter));
  }

  async create(docs, { _id: userId } = {}) {
    const created = await this.model.create(
      await this.parse(docs, userId, 'create'),
    );

    return created;
  }

  async update(filter, docs, { _id: userId } = {}, opts = {}) {
    const updated = await this.model.update(
      this.matcher(filter),
      await this.parse(docs, userId, 'update'),
      opts,
    );

    return updated;
  }

  delete(filter, { _id: userId } = {}, softDelete = true) {
    const { model } = this;

    // soft delete
    if (softDelete && model.softDelete) {
      return model.softDelete(this.matcher(filter), userId);
    }

    // hard delete
    return model.deleteMany(this.matcher(filter));
  }
}

Model.Schema = Schema;

module.exports = Model;
