import React from 'react';
import { object, string } from 'yup';

import Page from '../layout/Page';
import Doc from '../layout/Doc';
import Form from '~/commons/components/form';
import BtnHttpDel from '../btns/BtnHttpDel';
import usePath from '~/commons/hooks/usePath';

const PageUser = ({ match }) => {
  const { _id } = match.params;
  const { pushPath } = usePath();

  return (
    <Doc _id={_id} api={{ url: '/api/users' }}>
      {(doc) => (
        <Page
          header={{
            breadcrumb: [
              { to: '../', children: 'Users' },
            ],
            title: doc?.email || 'New',
          }}
        >
          <Form
            api={{
              url: `/api/users/${doc ? _id : ''}`,
              method: doc ? 'patch' : 'post',
            }}
            stored={doc}
            defaults={{ email: '', role: '', password: '' }}
            schema={object({
              email: string().email().required(),
              role: string().required(),
              password: (
                doc ? string() : string().required()
              ).min(8),
            })}
            beforeSubmit={({ password, ...values }) => ({
              ...values, ...(password && { password }),
            })}
            onSubmitted={({ data }) => {
              if (!doc) pushPath(data._id);
            }}
          >
            <div className="row mb-3">
              <div className="col">
                <Form.BtnSubmit />
              </div>
              <div className="col-auto">
                {doc && (
                  <BtnHttpDel
                    api={{ url: `/api/users/${_id}` }}
                    redirect=".."
                  />
                )}
              </div>
            </div>

            <Form.Field name="email" />
            <Form.Field name="role" as="select">
              <option value=""> - </option>
              <option value="admin">Admin</option>
              <option value="client">Client</option>
            </Form.Field>
            <Form.Field name="password" type="password" />
          </Form>
        </Page>
      )}
    </Doc>
  );
};

export default PageUser;
