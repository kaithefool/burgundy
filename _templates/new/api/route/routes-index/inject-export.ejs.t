---
inject: true
to: server/components/<%= ns %>/routes/index.js
before: routes\.use
---
routes.use('/<%= n.plural.path %>', <%= n.plural.camel %>);