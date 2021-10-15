import React from 'react';

import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { faUnlock } from '@fortawesome/free-solid-svg-icons/faUnlock';

import List from '~/commons/components/list';
import Page from '../layout/Page';

const PageUsers = () => (
  <Page
    header={{ title: 'Users' }}
  >
    <List
      api={{ url: '/api/users' }}
      selectable
      cols={[
        { key: 'email', sortable: true },
        { key: 'role' },
        { key: 'updatedAt', format: 'fromNow' },
      ]}
    >
      {({ selected }) => {
        const hasSelectedActive = Boolean(selected.find((r) => r.active));
        const hasSelectedInactive = Boolean(selected.find((r) => !r.active));

        return (
          <>
            <div className="row mb-3">
              <div className="col">
                <List.Search />
              </div>
              <List.Pagination className="col-auto" />
              <div className="col-auto">
                <List.ColsToggle />
              </div>
            </div>
            <div className="list-ctrls mb-3">
              <List.Ctrl.Create />
              <List.Ctrl.Refresh />
              {hasSelectedInactive && (
                <List.Ctrl.Patch
                  icon={faUnlock}
                  updates={{ active: true }}
                />
              )}
              <List.Ctrl.Save />
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
              <List.Table rowLink={({ _id }) => _id} />
            </List.Status>
          </>
        );
      }}
    </List>
  </Page>
);

export default PageUsers;
