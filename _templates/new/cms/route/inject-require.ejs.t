---
inject: true
to: assets/src/js/admin/components/routes.jsx
skip_if: import\sPage<%= n.singular.pascal %>\s
before: import\sPage.*?\sfrom
---
<% if (!singleton) { %>import Page<%= n.plural.pascal %> from './pages/Page<%= n.plural.pascal %>';
<% } %>import Page<%= n.singular.pascal %> from './pages/Page<%= n.singular.pascal %>';