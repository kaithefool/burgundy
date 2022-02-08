import React from 'react';
import { useParams } from 'react-router-dom';
import { array, object, string } from 'yup';

import Page from '../layout/Page';
import Doc from '../layout/doc';
import Form from '~/commons/components/form';
import { Tabs, Tab } from '~/commons/components/layout/tabs';
import { email, password } from '~/commons/validators';
import { reduceLng, mapLng } from '~/commons/helpers';

const defaults = {
  email: '',
  role: 'client',
  password: '',
  name: reduceLng(''),
  active: true,
  address: '',
  location: undefined,
  files: [],
  contacts: [],
};

const schema = (doc) => object({
  email: email().email().required(),
  password: doc ? password() : password().required(),

  // contacts: array().of(object({
  //   code: string().required(),
  // })),
});

const PageClient = () => {
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

            <Tabs route>
              <Tab eventKey="essentials">
                <Form.Check name="active" type="switch" />
                <Form.Input name="email" />
                <Form.Input name="password" type="password" />
                <Form.Input name="address" />
                <Form.Coordinates
                  name="location.coordinates"
                  address="address"
                />
                <Form.FilsList name="files" multiple />
                <Form.Array
                  name="contacts"
                  defaults={{
                    name: '',
                    phones: [],
                  }}
                >
                  {(i) => (
                    <>
                      <Form.Input name={`contacts.${i}.name`} />
                      <Form.Array
                        name={`contacts.${i}.phones`}
                        tmpl="list"
                        defaults={{
                          code: '',
                          number: '',
                        }}
                      >
                        {((ii) => (
                          <Form.Input
                            name={`contacts.${i}.phones.${ii}.number`}
                            label={null}
                          />
                        ))}

                      </Form.Array>
                    </>
                  )}
                </Form.Array>
              </Tab>
              <Tab eventKey="names">
                <div className="row">
                  {mapLng((ln) => (
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
