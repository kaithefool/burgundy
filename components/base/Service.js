const { castArray } = require('lodash');
const httpError = require('http-errors');

class Service {
  constructor(model) {
    this.model = model;
  }

  throw(...args) {
    throw httpError(...args);
  }

  find(filter) {
    return this.model.find({ filter });
  }

  async list(opts) {
    const { filter } = opts;

    const [rows, total] = await Promise.all([
      this.model.find(opts),
      this.model.count(filter),
    ]);

    return { rows, total };
  }

  async create(attrs, user) {
    let created;

    try {
      created = await this.model.insert(
        user
          ? castArray(attrs).map((a) => ({ ...a, created_by: user.id }))
          : attrs,
      );
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        this.throw(400, e.sqlMessage);
      }

      throw e;
    }

    return created;
  }

  upsert(attrs) {
    return this.model.upsert(attrs);
  }

  patch(attrs, user) {
    const { id, ...draft } = attrs;

    if (user) draft.updated_by = user.id;

    return this.model.update(draft, { id });
  }

  delete({ id }) {
    return this.model.delete({ id });
  }
}

module.exports = Service;
