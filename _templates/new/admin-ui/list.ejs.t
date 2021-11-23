---
to: "<%= singleton ? null : `assets/src/js/admin/components/pages/Page${n.plural.pascal}.jsx` %>"
---
import React from 'react';

import List from '~/commons/components/list';
import Page from '../layout/Page';

const Page<%= n.plural.pascal %> = () => (
  <Page
    header={{ title: '<%= n.plural.title %>' }}
  >
    <List
      api={{ url: '/api/<%= n.plural.path %>' }}
      selectable
      cols={[
      ]}
    >
      <div className="row">
        <div className="col-12 col-md mb-3">
          <List.Search />
        </div>
        <div className="col-auto mb-3">
          <List.Pg />
        </div>
      </div>
      <div className="mb-3">
        <List.Ctrl.Create />
        <List.Ctrl.Refresh />
        <List.Ctrl.Remove />
        <List.Ctrl.Export />
      </div>
      <List.Status>
        <List.Table rowLink={({ _id }) => _id} />
      </List.Status>
    </List>
  </Page>
);

export default Page<%= n.plural.pascal %>;
