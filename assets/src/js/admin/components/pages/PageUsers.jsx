import React from 'react';

import List from '~/commons/components/list';
import Page from '../layout/Page';
import ListCtrlActivate from '../list/ListCtrlActivate';

const PageUsers = () => (
  <Page>
    <List
      api={{ url: '/api/users' }}
      selectable
      cols={[
        { key: 'email', sortable: true },
        { key: 'name', sortable: true },
        { key: 'active' },
        { key: 'role' },
        { key: 'updatedAt', format: 'fromNow' },
        { key: 'lastLogin', format: 'datetime' },
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
        <List.Ctrl.Refresh />
        <ListCtrlActivate />
        <List.Ctrl.Remove />
        <List.Ctrl.Export />
      </div>
      <List.Status>
        <List.Table rowLink={({ _id, role }) => `${role}s/${_id}`} />
      </List.Status>
    </List>
  </Page>
);

export default PageUsers;
