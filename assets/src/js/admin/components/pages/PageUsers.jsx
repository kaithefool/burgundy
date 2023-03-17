import React from 'react';
import { useParams } from 'react-router-dom';

import Page from '../layout/Page';
import ListUsers from '../list/ListUsers';

const PageUsers = () => {
  const role = useParams().role?.replace(/s$/, '');

  return (
    <Page>
      <ListUsers
        {...role && { filter: { role } }}
      />
    </Page>
  );
};

export default PageUsers;
