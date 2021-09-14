import React from 'react';
import { useHistory } from 'react-router-dom';
import { object, string } from 'yup';

import Page from '../layout/Page';
import Doc from '../layout/Doc';
import Form from '~/commons/components/form';
import FilsList from '~/commons/components/fils/FilsList';

const PageUser = ({ match }) => {
  const { _id } = match.params;
  const history = useHistory();

  return (
    <Doc
      _id={_id}
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
              url: `/api/users/${user ? _id : ''}`,
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
              if (!user) history.push(payload._id);
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
            <FilsList
              api={{ url: '/api/files' }}
              multiple={3}
            />
          </Form>
        </Page>
      )}
    </Doc>
  );
};

export default PageUser;
