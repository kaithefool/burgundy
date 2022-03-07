import React from 'react';
import { array, object, string } from 'yup';

import Form from '~/commons/components/form';
import { Tabs, Tab } from '~/commons/components/layout/tabs';
import { password } from '~/commons/validators';
import { mapLng } from '~/commons/helpers';
import env from '~/commons/config/env';

import Doc from '../layout/doc';
import Page from '../layout/Page';

const defaults = {
  checkbox: true,
  switch: true,
  radio: 'radio-1',
  text: '',
  password: '',
  select: env.lngs[0],
  textarea: '',
  editor: '',
  files: [],
  coverImg: [],
  address: '',
  location: {},
  contacts: [{
    firstname: '',
    lastname: '',
    phones: [''],
  }],
};

const schema = () => object({
  password: password(),
  contacts: array().of(object({
    firstname: string().required(),
  })),
});

const PageExample = () => (
  <Doc _id="new" api={{ url: '/api/example' }}>
    {(doc) => (
      <Page
        header={{ title: 'Example' }}
      >
        <Doc.Form
          defaults={defaults}
          schema={schema(doc)}
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
            <Tab eventKey="general">
              <Form.Check name="checkbox" />
              <Form.Check name="switch" type="switch" />
              <Form.Check name="radio" type="radio" value="radio-1" />
              <Form.Check name="radio" type="radio" value="radio-2" />
              <Form.Input name="text" />
              <Form.Input name="password" type="password" />
              <Form.Password
                name="password"
                helpText="Password with visibility toggle"
              />
              <Form.Select
                name="select"
                helpText={`
                  Support array of strings,
                  array of label value paired object
                  and react components
                `}
              >
                {mapLng((value, label) => ({ value, label }))}
              </Form.Select>
              <Form.Textarea name="textarea" />
              <Form.Editor name="editor" />
            </Tab>
            <Tab eventKey="files">
              <Form.FilsList name="files" multiple />
              <Form.FilsCoverImg name="coverImg" />
            </Tab>
            <Tab eventKey="address">
              <Form.Input
                name="address"
                helpText="Need Google API key in your .env file to work"
              />
              <Form.Coordinates
                name="location.coordinates"
                address="address"
              />
            </Tab>
            <Tab eventKey="array">
              <Form.Array
                name="contacts"
                defaults={{
                  firstname: '',
                  lastname: '',
                  phones: [''],
                }}
              >
                {(i) => (
                  <>
                    <div className="row">
                      <div className="col">
                        <Form.Input name={`contacts.${i}.firstname`} />
                      </div>
                      <div className="col">
                        <Form.Input name={`contacts.${i}.lastname`} />
                      </div>
                    </div>
                    <Form.Array
                      name={`contacts.${i}.phones`}
                      tmpl="list"
                      defaults=""
                    >
                      {((ii) => (
                        <Form.Input
                          name={`contacts.${i}.phones.${ii}`}
                          label={null}
                        />
                      ))}

                    </Form.Array>
                  </>
                )}
              </Form.Array>
            </Tab>
          </Tabs>

        </Doc.Form>
      </Page>
    )}
  </Doc>
);

export default PageExample;
