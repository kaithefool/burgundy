import React from 'react';

import List from '~/lib/components/list';
import ListCtrlActivate from './ListCtrlActivate';

const ListUsers = (props) => (
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
    {...props}
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
      <ListCtrlActivate />
      <List.Ctrl.Remove />
      <List.Ctrl.Export />
    </div>
    <List.Status>
      <List.Table rowLink={({ _id }) => _id} />
    </List.Status>
  </List>
);

export default ListUsers;
