const { Router } = require('express');
const { get, castArray, forEach } = require('lodash');

const authorizer = require('./authorizer');
const validator = require('./validator');

const defaultNamedRoutes = {
  list: {},
  find: {
    path: '/:id',
    response: (req, res) => {
      const { out } = res.locals;

      return out ? res.json(out) : res.status(404).end();
    },
  },
  create: { method: 'post' },
  patch: { method: 'patch', path: '/:id' },
  delete: { method: 'delete', path: '/:id' },
};

class Routes {
  constructor(props, routes, settings) {
    Object.assign(this, props);
    this.router = Router(settings);

    // named routes
    this.parseNamedRoutes();

    // register routes
    forEach(this.routes, (r, serve) => {
      this.registerRoute({ serve, ...r });
    });

    return this.router;
  }

  namedRoutes() {
    return defaultNamedRoutes;
  }

  // shorthands for common routes
  parseNamedRoutes() {
    const draft = {};
    const namedRoutes = this.namedRoutes();

    // insert named routes
    forEach(this.routes, (opts, serve) => {
      draft[serve] = opts === true
        ? namedRoutes[serve]
        : opts;
    });

    this.routes = draft;
  }

  attrsFetcher(attrsPath = ['query', 'params', 'body', 'docs']) {
    return (req, res, next) => {
      req.attrs = {
        ...req.attrs,
        ...castArray(attrsPath).map((p) => req[p]),
      };

      next();
    };
  }

  handles(serve) {
    const { service } = this;

    return async ({
      attrs,
      user,
    }, res, next) => {
      res.locals.out = await service[serve](attrs, user);

      return next();
    };
  }

  guards(serve) {
    const g = [];
    const a = get(this, `authorizer.${serve}`);
    const v = get(this, `validator.${serve}`);

    if (a) g.push(authorizer(a));
    if (v) g.push(validator(v));

    return g;
  }

  registerRoute({
    path = '/',
    method = 'get',
    attrsPath,
    serve,
    parse = [],
    response = [],
  }) {
    this.router[method.toLowerCase()](
      path,
      this.attrsFetcher(attrsPath),

      // parsers
      ...castArray(parse),

      // service handler
      this.handles(serve),

      // guards
      ...this.guards(serve),

      // responders
      ...castArray(response),

      // default responder
      (req, res) => {
        const { out } = res.locals;

        return out ? res.json(out) : res.end();
      },
    );
  }
}

module.exports = Routes;
