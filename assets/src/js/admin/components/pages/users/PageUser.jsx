import React from 'react';
import { object, string } from 'yup';

import Page from '../../layout/Page.jsx';
import Resource from '../../layout/Resource.jsx';
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
      <Resource
        id={id}
        api={{ url: '/api/users' }
      }>
        {(user) => (
          <Form
            api={{
              url: `/api/users/${user ? id : ''}`,
              method: user ? 'patch' : 'post',
            }}
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
      </Resource>
    </Page>
  );
};

export default PageUser;
