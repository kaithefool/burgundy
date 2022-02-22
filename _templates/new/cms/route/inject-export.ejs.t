---
inject: true
to: assets/src/js/admin/components/routes.jsx
skip_if: (<%= n.singular.param %>|<%= n.plural.param %>)("|')
after: <Routes>
---
<% if (singleton) { %>    <Route path="/<%= n.singular.param %>" element={<Page<%= n.singular.pascal %> />} /><% } else { %>
    <Route path="<%= n.plural.param %>" element={<Page<%= n.plural.pascal %> />} />
    <Route path="<%= n.plural.param %>/:_id" element={<Page<%= n.singular.pascal %> />} /><% } %>
