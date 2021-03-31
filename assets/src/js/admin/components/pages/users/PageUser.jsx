import React from 'react';
import { useHistory } from 'react-router-dom';
import { object, string } from 'yup';

import Page from '../../layout/Page.jsx';
import Resource from '../../layout/Resource.jsx';
import Form from '~/commons/components/form';

const PageUser = ({ match }) => {
  const { id } = match.params;
  const history = useHistory();

  return (
    <Resource
      id={id}
      api={{ url: '/api/core/users' }
    }>
      {(user) => (
        <Page
          header={{
            breadcrumb: [
              { to: '../', children: 'Users' },
            ],
            title: user?.email || 'New User',
          }}
        >
          <Form
            api={{
              url: `/api/users/${user ? id : ''}`,
              method: user ? 'patch' : 'post',
            }}
            stored={user}
            defaults={{ email: '', role: '' }}
            schema={object({
              email: string().email().required(),
              role: string().required(),
            })}
            beforeSubmit={({ password, ...values }) => ({
              ...values, ...(password && { password }),
            })}
            onSubmitted={({ payload }) => {
              if (!user) history.push(payload.id);
            }}
          >
            <Form.BtnSubmit />
            <Form.Field name="email" />
            <Form.Field name="role" as="select">
              <option value=""> - </option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </Form.Field>
          </Form>
        </Page>
      )}
    </Resource>
  );
};

export default PageUser;
