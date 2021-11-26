import React from 'react';
import { useParams } from 'react-router-dom';
import { object, string } from 'yup';

import Page from '../layout/Page';
import Doc from '../layout/doc';
import Form from '~/commons/components/form';
import env from '~/commons/config/env';

const defaults = {
  email: '',
  role: 'admin',
  password: '',
  name: env.lngs.reduce((a, l) => ({
    ...a, [l]: '',
  }), {}),
  active: true,

  profiles: [],
  avatar: [],
  cover: [],
  intro: '',
};

const schema = (doc) => object({
  email: string().email().required(),
  role: string().required(),
  password: (
    doc ? string() : string().required()
  ).min(8),
});

const PageAdmin = () => {
  const { _id } = useParams();

  return (
    <Doc _id={_id} api={{ url: '/api/users' }}>
      {(doc) => (
        <Page
          header={{
            breadcrumb: [
              { to: '../..', children: 'Users' },
              { to: '..', children: 'Admins' },
            ],
            title: doc?.email || 'New',
          }}
        >
          <Doc.Form
            defaults={defaults}
            schema={schema(doc)}
            beforeSubmit={({ password, ...values }) => ({
              ...values, ...(password && { password }),
            })}
          >
            <div className="row mb-3 align-items-center">
              <div className="col-auto">
                <Form.BtnSubmit />
              </div>
              <div className="col-auto">
                <Doc.UpdatedAt />
              </div>
              <div className="col text-end">
                <Doc.BtnDel />
              </div>
            </div>

            <Form.Check name="active" type="switch" />
            <Form.Input name="email" />
            <Form.Input name="password" type="password" />
            <div className="row">
              {env.lngs.map((ln) => (
                <div className="col" key={ln}>
                  <Form.Input name={`name.${ln}`} />
                </div>
              ))}
            </div>

          </Doc.Form>
        </Page>
      )}
    </Doc>
  );
};

export default PageAdmin;
