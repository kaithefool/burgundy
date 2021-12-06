import React from 'react';

import List from '~/commons/components/list';
import Page from '../layout/Page';
import ListCtrlActivate from '../list/ListCtrlActivate';

const PageViews = () => (
  <Page
    header={{ title: 'Views' }}
  >
    <List
      api={{ url: '/api/views' }}
      selectable
      cols={[
        { key: 'url', sortable: true },
        { key: 'title' },
        { key: 'active' },
        { key: 'redirect' },
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
      </div>
      <List.Status>
        <List.Table rowLink={({ _id }) => _id} />
      </List.Status>
    </List>
  </Page>
);

export default PageViews;
