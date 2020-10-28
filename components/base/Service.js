const { castArray } = require('lodash');

class Service {
  constructor(model) {
    this.model = model;
  }

  throw(message, status = 400) {
    const e = new Error(message);

    e.status = status;
    throw e;
  }

  find(filter) {
    return this.model.find({ filter });
  }

  async list() {
    
  }

  create(attrs, user) {
    return this.model.insert(
      user
        ? castArray(attrs).map((a) => ({ ...a, createdby: user.id }))
        : attrs,
    );
  }

  patch(attrs, user) {

  }

  delete({ id }) {
    return this.model.delete({ id });
  }
}

export default Service;
