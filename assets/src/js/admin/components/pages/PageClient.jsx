import React from 'react';
import { useParams } from 'react-router-dom';
import { object, string } from 'yup';
import { Tabs, Tab } from 'react-bootstrap';

import Page from '../layout/Page';
import Doc from '../layout/doc';
import Form from '~/commons/components/form';
import env from '~/commons/config/env';
import { email, password } from '~/commons/validators';

const defaults = {
  email: '',
  role: 'client',
  password: '',
  name: env.lngs.reduce((a, l) => ({
    ...a, [l]: '',
  }), {}),
  active: true,
};

const schema = (doc) => object({
  email: email().email().required(),
  role: string().required(),
  password: doc ? password() : password().required(),
});

const PageClient = () => {
  const { _id } = useParams();

  return (
    <Doc _id={_id} api={{ url: '/api/users' }}>
      {(doc) => (
        <Page
          header={{
            breadcrumb: [
              { to: '../..', children: 'Users' },
              { to: '..', children: 'Clients' },
            ],
            title: doc?.email || 'New',
          }}
        >
          <Doc.Form
            defaults={defaults}
            schema={schema(doc)}
            beforeSubmit={({ password: p, ...values }) => ({
              ...values, ...(p && { password: p }),
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

            <Tabs
              defaultActiveKey="essentials"
              className="mb-4"
              unmountOnExit
            >
              <Tab eventKey="essentials" title="Essentials">
                <Form.Check name="active" type="switch" />
                <Form.Input name="email" />
                <Form.Input name="password" type="password" />
              </Tab>
              <Tab eventKey="names" title="Names">
                <div className="row">
                  {env.lngs.map((ln) => (
                    <div className="col" key={ln}>
                      <Form.Input name={`name.${ln}`} />
                    </div>
                  ))}
                </div>
              </Tab>
            </Tabs>

          </Doc.Form>
        </Page>
      )}
    </Doc>
  );
};

export default PageClient;
