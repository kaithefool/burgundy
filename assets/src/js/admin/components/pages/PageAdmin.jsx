import React from 'react';
import { useParams } from 'react-router-dom';
import { object } from 'yup';

import Form from '~/commons/components/form';
import { email, password } from '~/commons/validators';
import { reduceLng, mapLng } from '~/commons/helpers';

import Doc from '../layout/doc';
import Page from '../layout/Page';

const defaults = {
  email: '',
  role: 'admin',
  password: '',
  name: reduceLng(''),
  active: true,
};

const schema = (doc) => object({
  email: email().required(),
  password: doc ? password() : password().required(),
});

const PageAdmin = () => {
  const { _id } = useParams();

  return (
    <Doc _id={_id} api={{ url: '/api/users' }}>
      {(doc) => (
        <Page
          header={{
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

            <Form.Check name="active" type="switch" />
            <Form.Input name="email" />
            <Form.Input name="password" type="password" />
            <div className="row">
              {mapLng((ln) => (
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
