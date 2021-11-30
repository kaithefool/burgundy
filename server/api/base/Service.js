const httpError = require('http-errors');

class Service {
  constructor(model, opts = {}) {
    this.model = model;
    this.opts = opts;
  }

  throw(...args) {
    throw httpError(...args);
  }

  catch(err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      this.throw(400, 'res.duplicates');
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

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
  escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  search(f) {
    let { search: opts } = this.opts;
    if (!opts || !f) return null;

    if (typeof opts === 'string' || Array.isArray(opts)) {
      opts = { default: opts };
    }

    const by = Object.keys(typeof f === 'object' ? f : opts)[0];
    const query = typeof f === 'object' ? Object.values(f)[0] : f;
    const regex = new RegExp(this.escapeRegExp(query.trim()), 'i');
    const fields = opts[by];

    if (!fields) return null;

    if (Array.isArray(fields)) {
      return {
        $or: fields.map((fld) => ({ [fld]: regex })),
      };
    }

    return { [fields]: regex };
  }

  match({ search, ...filter } = {}) {
    return {
      ...this.search(search),
      ...filter,
    };
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

  async upsert(attrs, user, match = {}) {
    return this.patchBy(match, attrs, user, { upsert: true });
  }

  async deleteBy(filter, user) {
    return this.model.delete(
      this.match(filter, user),
      user,
    );
  }

  delete({ _id }, user) {
    return this.deleteBy({ _id }, user);
  }
}

module.exports = Service;
