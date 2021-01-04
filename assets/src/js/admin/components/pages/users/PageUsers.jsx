import React from 'react';

import ListResource from '~/commons/components/list/ListResource.jsx';

const PageUsers = () => (
  <div>
    <h1>Users</h1>
    <ListResource
      api={{ url: '/api/core/users' }}
      selectable={true}
      searchable={[
        'email',
      ]}
      ctrls={{
        create: true,
        refresh: true,
        remove: true,
      }}
      cols={[
        { key: 'email', sortable: true },
      ]}
    />
  </div>
);

export default PageUsers;
