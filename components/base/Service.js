const { castArray } = require('lodash');
const createError = require('http-errors');

class Service {
  constructor(model) {
    this.model = model;
  }

  throw(...args) {
    throw createError(...args);
  }

  find(filter) {
    return this.model.find({ filter });
  }

  async list(opts) {
    const { filter } = opts;

    const rows = await this.model.find(opts);
    const total = await this.model.count(filter);

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

export default Service;
