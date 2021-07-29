---
inject: true
to: assets/src/js/admin/components/routes/index.jsx
skip_if: \/<%= n.plural.path %>("|')
after: <Switch>
---
    <RouteResource
      path="/admin/<%= n.plural.path %>"
      List={Page<%= n.plural.pascal %>}
      Doc={Page<%= n.singular.pascal %>}
    />