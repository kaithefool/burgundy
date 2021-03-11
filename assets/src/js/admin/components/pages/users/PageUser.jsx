import React from 'react';

import Page from '../../layout/Page.jsx';
import Fetchable from '~/commons/components/util/Fetchable.jsx';

const PageUser = ({ match }) => {
  const { id } = match.params;

  return (
    <Page
      header={{
        breadcrumb: [
          { to: '../', children: 'Users' },
        ],
        title: 'User',
      }}
    >
      <Fetchable req={{ url: `/api/users/${id}` }}>
        {(user) => {

        }}
      </Fetchable>
    </Page>
  );
};

export default PageUser;
