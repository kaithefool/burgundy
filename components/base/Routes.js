const { Router } = require('express');

class Routes {
  constructor(props, routes, settings) {
    Object.assign(this, props);
    this.router = Router(settings);

    return this.router;
  }
}

module.exports = Routes;
