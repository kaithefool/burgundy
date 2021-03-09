import React from 'react';
import { history } from 'react-router-dom';

import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { faUnlock } from '@fortawesome/free-solid-svg-icons/faUnlock';

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
        <List.Ctrl.Patch
          icon={faUnlock}
          updates={{ active: true }}
        />
        <List.Ctrl.Patch
          icon={faLock}
          updates={{ active: false }}
        />
        <List.Ctrl.Remove />
        <List.Ctrl.Export />
      </div>
      <List.Status />
      <List.Table
        cols={[
          { key: 'email', sortable: true },
        ]}
        onRowClick={({ _id }) => history.push(_id)}
      />
    </List>
  </Page>
);

export default PageUsers;
