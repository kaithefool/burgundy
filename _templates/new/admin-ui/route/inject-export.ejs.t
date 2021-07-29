---
inject: true
to: assets/src/js/components/routes/index.jsx
skip_if: \/<%= n.plural.path %>("|')
---
<RouteResource
  path="/admin/<%= n.plural.path %>"
  List={Page<%= n.plural.pascal %>}
  Doc={Page<%= n.singular.pascal %>}
/>