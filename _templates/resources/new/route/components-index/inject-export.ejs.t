---
inject: true
to: server/components/<%= ns %>/routes/index.js
skip_if: <%= ns %>
before: components.use
---
components.use('/<%= ns %>', <%= ns %>);