import React from 'react';

import List from '~/commons/components/list';
import Page from '../layout/Page';

const PageAccessLogs = () => (
  <Page>
    <List
      api={{ url: '/api/access-logs' }}
      cols={[
        { key: 'createdAt', format: 'datetime', sortable: true },
        { key: 'action', sortable: true },
        { key: 'user.email' },
        { key: 'ip', label: 'IP' },
        { key: 'userAgent', hide: true },
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
        <List.Ctrl.Export />
      </div>
      <List.Status>
        <List.Table />
      </List.Status>
    </List>
  </Page>
);

export default PageAccessLogs;
