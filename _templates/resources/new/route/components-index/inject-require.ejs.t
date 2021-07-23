---
inject: true
to: server/components/<%= ns %>/routes/index.js
skip_if: <%= ns %>
before: require\('\..*?\/routes
---
const <%= ns %> = require('./<%= ns %>');