import React from 'react';
import { array, object, string } from 'yup';

import Form from '~/lib/components/form';
import Cal from '~/lib/components/cal';
import { Slider } from '~/lib/components/slider';
import FilsGallery from '~/lib/components/fils/FilsGallery';
import { Tabs, Tab } from '~/lib/components/layout/tabs';
import { password } from '~/lib/validators';
import { mapLng, reduceLng } from '~/lib/helpers';
import env from '~/lib/config/env';

import Doc from '../layout/doc';
import Page from '../layout/Page';

const demoImgs = [
  'https://images.unsplash.com/photo-1684051489159-526760dbb8ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  'https://images.unsplash.com/photo-1680790960435-e5b9670138b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
  'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1683177920180-0175523b0271?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80',
  'https://images.unsplash.com/photo-1583872341575-610c859c7a57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=806&q=80',
  'https://images.unsplash.com/photo-1683488780112-f47a64de5d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
];
const demoSlides = demoImgs.map((s) => ({ path: s, type: 'image/jpeg' }));

const defaults = {
  checkbox: true,
  switch: true,
  radio: 'radio-1',
  stepper: 0,
  text: '',
  password: '',
  select: env.lngs[0],
  textarea: '',
  editor: '',
  lngTexts: reduceLng(''),
  files: [],
  coverImg: [],
  address: '',
  location: {},
  contacts: [{
    firstname: '',
    lastname: '',
    phones: [''],
  }],
  ref: null,
  refs: [],
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
          {({ values }) => {
            const files = values.files.length ? values.files : demoSlides;

            return (
              <>
                <Doc.Ctrls />

                <Tabs route>
                  <Tab eventKey="general">
                    <Form.Check name="checkbox" />
                    <Form.Check name="switch" type="switch" />
                    <Form.Check name="radio" type="radio" value="radio-1" />
                    <Form.Check name="radio" type="radio" value="radio-2" />
                    <div style={{ width: '9rem' }}>
                      <Form.Stepper name="stepper" />
                    </div>
                    <Form.Input name="text" />
                    <Form.Input name="password" type="password" />
                    <Form.Password
                      name="password"
                      helpText="Password with visibility toggle"
                    />
                    <Form.LngGroup name="lngTexts">
                      {(lng) => (
                        <Form.Input name={`lngTexts.${lng}`} fieldOnly />
                      )}
                    </Form.LngGroup>
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
                    <Form.FilsCoverImg name="coverImg" />
                    <Form.FilsList name="files" multiple />
                    <Form.Label name="gallery" />
                    <FilsGallery files={files} />
                    <Form.Label name="slider" />
                    <Slider.Lightbox slides={files}>
                      {({ turnOn }) => (
                        <Slider slides={files}>
                          <div><Slider.Pg /></div>
                          <div className="position-relative">
                            <Slider.Body
                              style={{ height: '50vh' }}
                              pagination={{ clickable: true }}
                              slideProps={(s, i) => ({
                                onClick: () => turnOn(i),
                              })}
                            />
                            <Slider.Nav />
                          </div>
                          <Slider.Thumbs />
                        </Slider>
                      )}
                    </Slider.Lightbox>
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
                      tmpl="formset"
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
                  <Tab eventKey="relations">
                    <Form.Ref
                      name="ref"
                      api={{ url: '/api/users' }}
                    >
                      {(r) => r.email}
                    </Form.Ref>
                    <Form.Refs
                      name="refs"
                      api={{ url: '/api/users' }}
                    >
                      {(r) => r.email}
                    </Form.Refs>
                  </Tab>
                  <Tab eventKey="calendar">
                    <Cal
                      api={{ url: '/api/access-logs/all' }}
                      field="createdAt"
                    >
                      <Cal.Header />
                      <Cal.Body />
                    </Cal>
                  </Tab>
                </Tabs>
              </>
            );
          }}
        </Doc.Form>
      </Page>
    )}
  </Doc>
);

export default PageExample;
