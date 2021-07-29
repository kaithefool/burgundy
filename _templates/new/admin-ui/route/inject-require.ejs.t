---
inject: true
to: assets/src/js/admin/components/routes/index.jsx
skip_if: import\sPage<%= n.singular.pascal %>\s
before: import\sPage.*?\sfrom
---
import Page<%= n.plural.pascal %> from '../pages/users/Page<%= n.plural.pascal %>';
import Page<%= n.singular.pascal %> from '../pages/users/Page<%= n.singular.pascal %>';