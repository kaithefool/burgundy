---
inject: true
to: server/components/routes/index.js
before: routes\.use
---
routes.use('/<%= n.plural.path %>', <%= n.plural.camel %>);