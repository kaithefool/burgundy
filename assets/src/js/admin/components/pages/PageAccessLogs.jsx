import React from 'react';

import List from '~/lib/components/list';
import Page from '../layout/Page';

const PageAccessLogs = () => (
  <Page>
    <List
      api={{ url: '/api/access-logs' }}
      initQuery={{ sort: { createdAt: -1 } }}
      cols={[
        { key: 'createdAt', format: 'datetime', sortable: true },
        { key: 'action', sortable: true },
        {
          key: 'user',
          getter: (u) => u?.email || u?.mobile || u?.username,
        },
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
      <div className="mb-3 d-flex flex-wrap gap-2">
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
