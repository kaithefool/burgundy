---
inject: true
to: assets/src/js/admin/components/routes/index.jsx
skip_if: \/<%= n.plural.path %>("|')
after: <Switch>
---
<% if (singleton) { %>
    <RouteResource
      path="/admin/<%= n.singular.path %>"
      Doc={Page<%= n.singular.pascal %>}
      singleton
    />
<% } else { %>
    <RouteResource
      path="/admin/<%= n.plural.path %>"
      List={Page<%= n.plural.pascal %>}
      Doc={Page<%= n.singular.pascal %>}
    />
<% } %>