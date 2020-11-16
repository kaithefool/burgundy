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

  create(attrs, user) {
    return this.model.insert(
      user
        ? castArray(attrs).map((a) => ({ ...a, createdby: user.id }))
        : attrs,
    );
  }

  patch(attrs, user) {
    const { id, ...draft } = attrs;

    if (user) draft.updatedby = user.id;

    return this.model.update(draft, { id });
  }

  delete({ id }) {
    return this.model.delete({ id });
  }
}

module.exports = Service;
