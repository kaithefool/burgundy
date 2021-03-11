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
      {({ selected }) => {
        const hasSelectedActive = Boolean(selected.find((r) => r.active));
        const hasSelectedInactive = Boolean(selected.find((r) => !r.active));

        return (
          <>
            <div className="row">
              <div className="col">
                <List.Search />
              </div>
              <List.Pagination className="col-auto" />
            </div>
            <div>
              <List.Ctrl.Create />
              <List.Ctrl.Refresh />
              {hasSelectedInactive && (
                <List.Ctrl.Patch
                  icon={faUnlock}
                  updates={{ active: true }}
                />
              )}
              {hasSelectedActive && (
                <List.Ctrl.Patch
                  icon={faLock}
                  updates={{ active: false }}
                />
              )}
              <List.Ctrl.Remove />
              <List.Ctrl.Export />
            </div>
            <List.Status>
              <List.Table
                cols={[
                  { key: 'email', sortable: true },
                ]}
                onRowClick={({ id }) => history.push(id)}
              />
            </List.Status>
          </>
        );
      }}
    </List>
  </Page>
);

export default PageUsers;
