class Service {
  constructor(model) {
    this.model = model;
  }

  throw(message, status = 400) {
    const e = new Error(message);

    e.status = status;
    throw e;
  }

  find() {}

  list() {}

  create() {}

  patch() {}

  delete() {}
}

export default Service;
