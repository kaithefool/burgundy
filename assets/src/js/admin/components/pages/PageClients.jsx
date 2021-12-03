import React from 'react';

import List from '~/commons/components/list';
import Page from '../layout/Page';
import ListCtrlActivate from '../list/ListCtrlActivate';

const PageClients = () => (
  <Page
    header={{ title: 'Clients' }}
  >
    <List
      api={{ url: '/api/users' }}
      selectable
      filter={{ role: 'client' }}
      cols={[
        { key: 'email', sortable: true },
        { key: 'name', sortable: true },
        { key: 'active' },
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
        <List.Ctrl.Create />
        <List.Ctrl.Refresh />
        <ListCtrlActivate />
        <List.Ctrl.Remove />
        <List.Ctrl.Export />
        <List.Ctrl.Import
          template="/api/assets/user-import-tmpl.csv"
        />
      </div>
      <List.Status>
        <List.Table rowLink={({ _id }) => _id} />
      </List.Status>
    </List>
  </Page>
);

export default PageClients;
