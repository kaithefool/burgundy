---
inject: true
to: server/components/index.js
skip_if: require.*?<%= ns %>
before: require\('\..*?\/routes
---
const <%= ns %> = require('./<%= ns %>/routes');