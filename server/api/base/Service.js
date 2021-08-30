const httpError = require('http-errors');

class Service {
  constructor(model) {
    this.model = model;
  }

  throw(...args) {
    throw httpError(...args);
  }

  catch(err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      this.throw(400, 'err.duplicates');
    }

    throw err;
  }

  async try(fn) {
    let data;

    try {
      data = await fn();
    } catch (e) {
      this.catch(e);
    }

    return data;
  }

  match(filter) {
    return filter;
  }

  find(filter, user, opts) {
    return this.model.find({
      filter: this.match(filter, user),
      ...opts,
    });
  }

  async list(opts, user) {
    let { filter } = opts;

    filter = this.match(filter, user);

    const [rows, total] = await Promise.all([
      this.model.find({ ...opts, filter }),
      this.model.count(filter),
    ]);

    return { rows, total };
  }

  async create(attrs, user) {
    return this.try(
      () => this.model.create(attrs, user),
    );
  }

  async patchBy(filter, attrs, user, opts) {
    return this.try(
      () => this.model.update(
        this.match(filter, user),
        attrs,
        user,
        opts,
      ),
    );
  }

  async patch({ _id, ...attrs }, user) {
    return this.patchBy({ _id }, attrs, user);
  }

  delete({ _id }, user) {
    return this.model.delete(
      this.match({ _id }, user),
      user,
    );
  }
}

module.exports = Service;
