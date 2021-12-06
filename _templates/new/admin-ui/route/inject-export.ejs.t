---
inject: true
to: assets/src/js/admin/components/routes/index.jsx
skip_if: <%= n.singular.path %>("|')
after: <Routes>
---
<% if (singleton) { %>    <Route path="/<%= n.singular.path %>" element={<Page<%= n.singular.pascal %> />} /><% } else { %>
    <Route path="<%= n.plural.path %>" element={<Page<%= n.plural.pascal %> />} />
    <Route path="<%= n.plural.path %>/:_id" element={<Page<%= n.singular.pascal %> />} /><% } %>
