import React from 'react';
import { useHistory } from 'react-router-dom';
import { object, string } from 'yup';

import Page from '../../layout/Page';
import Doc from '../../layout/Doc';
import Form from '~/commons/components/form';

const PageUser = ({ match }) => {
  const { id } = match.params;
  const history = useHistory();

  return (
    <Doc
      id={id}
      api={{ url: '/api/users' }}
    >
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
            defaults={{ email: '', role: '', password: '' }}
            schema={object({
              email: string().email().required(),
              role: string().required(),
              password: (
                user ? string() : string().required()
              ).min(8),
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
            <Form.Field
              name="password"
              type="password"
            />
          </Form>
        </Page>
      )}
    </Doc>
  );
};

export default PageUser;
