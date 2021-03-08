import React from 'react';

import List from '~/commons/components/list';
import Page from '../../layout/Page.jsx';

const PageUsers = () => (
  <Page
    header={{ title: 'Users' }}
  >
    <List
      api={{ url: '/api/core/users' }}
      selectable={true}
    >
      <div className="row">
        <div className="col">
          <List.Search
            opts={['email']}
          />
        </div>
        <div className="col">
          <List.Pagination />
        </div>
      </div>
      <div>
        <List.Ctrl.Create />
        <List.Ctrl.Refresh />
        <List.Ctrl.Remove />
      </div>
      <List.Table
        cols={[
          { key: 'email', sortable: true },
        ]}
      />
    </List>
  </Page>
);

export default PageUsers;
