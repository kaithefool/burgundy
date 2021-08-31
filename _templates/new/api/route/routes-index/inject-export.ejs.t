---
inject: true
to: server/api/routes/index.js
before: routes\.use
---
routes.use('/<%= n.plural.path %>', <%= n.plural.camel %>);