import React from 'react';

import Page from '../layout/Page';
import ListUsers from '../list/ListUsers';

const PageAdmins = () => (
  <Page>
    <ListUsers
      filter={{ role: 'admin' }}
    />
  </Page>
);

export default PageAdmins;
