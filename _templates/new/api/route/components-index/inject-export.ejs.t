---
inject: true
to: server/components/index.js
skip_if: components\.use.*?<%= ns %>
before: components\.use
---
components.use('/<%= ns %>', <%= ns %>);