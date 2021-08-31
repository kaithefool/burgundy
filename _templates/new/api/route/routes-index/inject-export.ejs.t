---
inject: true
to: server/api/routes/index.js
before: routes\.use
---
routes.use('/<%= n.plural.param %>', <%= n.plural.camel %>);