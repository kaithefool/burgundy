import React from 'react';
import { object, string } from 'yup';

import Page from '../../layout/Page.jsx';
import Fetchable from '~/commons/components/util/Fetchable.jsx';
import Form from '~/commons/components/form';

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
        {(user) => (
          <Form
            api={{ url: `/api/users/${id}`, method: 'patch' }}
            stored={user}
            default={{ email: '' }}
            schema={object({
              email: string().email().required(),
            })}
          >
            <Form.BtnSubmit />
            <Form.Field name="email" />
          </Form>
        )}
      </Fetchable>
    </Page>
  );
};

export default PageUser;
