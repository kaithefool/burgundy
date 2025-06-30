import React from 'react';
import { useParams } from 'react-router-dom';
import { object } from 'yup';

import env from '~/lib/config/env';
import Form from '~/lib/components/form';
import { email, password } from '~/lib/validators';
import { reduceLng } from '~/lib/helpers';

import Doc from '../layout/doc';
import Page from '../layout/Page';

const defaults = (attrs) => ({
  email: '',
  role: env.roles[0],
  password: '',
  name: reduceLng(''),
  active: true,
  ...attrs,
});

const schema = (doc) => object({
  email: email().required(),
  password: doc ? password() : password().required(),
});

const PageAdmin = () => {
  const params = useParams();
  const { _id } = params;
  const role = params.role?.replace(/s$/, '');

  return (
    <Doc _id={_id} api={{ url: '/api/users' }}>
      {(doc) => (
        <Page
          header={{
            title: doc?.email || 'New',
          }}
        >
          <Doc.Form
            defaults={defaults({
              ...role && { role },
            })}
            schema={schema(doc)}
            beforeSubmit={({ password: p, ...values }) => ({
              ...values, ...(p && { password: p }),
            })}
          >
            <Doc.Ctrls del />

            <Form.Check name="active" type="switch" />
            {(doc || !role) && (
              <Form.Select name="role">
                {env.roles}
              </Form.Select>
            )}
            <Form.Input name="email" />
            <Form.Input name="password" type="password" />
            <Form.LngGroup name="name">
              {(lng) => (
                <Form.Input name={`name.${lng}`} fieldOnly />
              )}
            </Form.LngGroup>

          </Doc.Form>
        </Page>
      )}
    </Doc>
  );
};

export default PageAdmin;
