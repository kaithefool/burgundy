import React from 'react';

import ListResource from '~/commons/components/list/ListResource.jsx';

const ListUsers = () => (
  <ListResource
    api="/api/users"
    cols={[
      { key: 'email', sortable: true },
    ]}
  />
);

export default ListUsers;
