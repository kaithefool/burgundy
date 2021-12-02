const { Router } = require('express');
const _ = require('lodash');

const authorizer = require('./authorizer');
const validator = require('./validator');

const idMatch = '[0-9a-f]{24}';
const responseOne = (req, res) => {
  const { out: [o] = [] } = res.locals;

  return o ? res.json(o) : res.status(404).end();
};

const defaultNamedRoutes = {
  list: {},
  find: {
    path: `/:_id(${idMatch})`,
    response: responseOne,
  },
  findOne: { response: responseOne },
  create: { method: 'post' },
  patch: { method: 'patch', path: `/:_id(${idMatch})` },
  upsert: { method: 'put' },
  delete: { method: 'delete', path: `/:_id(${idMatch})?` },
};

class Routes {
  constructor(props, routes, settings) {
    Object.assign(this, props);
    this.router = Router(settings);
    this.routes = routes;

    // named routes
    this.parseNamedRoutes();

    // register routes
    _.forEach(this.routes, (r, serve) => {
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
    _.forEach(this.routes, (opts, serve) => {
      draft[serve] = opts === true
        ? namedRoutes[serve]
        : opts;
    });

    this.routes = draft;
  }

  attrsFetcher(attrsPath = ['query', 'params', 'body', 'docs']) {
    return (req, res, next) => {
      req.attrs = Object.assign(
        {},
        req.attrs,
        ..._.castArray(attrsPath).map((p) => {
          const a = req[p];

          return Array.isArray(a) ? { data: a } : a;
        }),
      );

      next();
    };
  }

  handles(serve) {
    const { service } = this;

    return async ({
      attrs,
      user,
      t, // i18n
    }, res, next) => {
      try {
        res.locals.out = await service[serve](attrs, user, { t });
      } catch (e) {
        return next(e);
      }

      return next();
    };
  }

  guards(serve) {
    const g = [];
    const v = _.get(this, `validate.${serve}`);
    const a = this.authorize instanceof Object
      ? this.authorize[serve]
      : this.authorize;

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
      ..._.castArray(parse),

      // guards
      ...this.guards(serve),

      // service handler
      this.handles(serve),

      // responders
      ..._.castArray(response),

      // default responder
      (req, res) => {
        const { out } = res.locals;

        return out ? res.json(out) : res.end();
      },
    );
  }
}

module.exports = Routes;
