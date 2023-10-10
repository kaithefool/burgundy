import React, { useState } from 'react';
import {
  array, boolean, object, string,
} from 'yup';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { faUnlock } from '@fortawesome/free-solid-svg-icons/faUnlock';

import Form from '~/lib/components/form';
import Cal from '~/lib/components/cal';
import Slider from '~/lib/components/slider';
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
const demoTexts = [
  { title: 'Lorem ipsum dolor sit amet', text: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
  { title: 'Ut enim ad minim veniam', text: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat' },
  { title: 'Duis aute irure dolor in reprehenderit', text: 'In voluptate velit esse cillum dolore eu fugiat nulla pariatur' },
  { title: 'Excepteur sint occaecat cupidatat', text: 'Sunt in culpa qui officia deserunt mollit anim id est laborum' },
  { title: 'Sed ut perspiciatis unde omnis', text: 'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae' },
  { title: 'Nemo enim ipsam voluptatem', text: 'Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt' },
];

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
  lngEditor: reduceLng(''),
  date: '',
  time: '',
  datetime: '',
  dateRange: [],
  timeRange: [],
  avatar: [],
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
  checkbox: boolean().oneOf([true]),
  password: password(),
  contacts: array().of(object({
    firstname: string().required(),
  })),
  avatar: array().min(1),
});

const FieldsGeneral = () => (
  <>
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
    <Form.LngGroup name="lngEditor" block>
      {(lng) => (
        <Form.Editor
          key={lng}
          name={`lngEditor.${lng}`}
          fieldOnly
        />
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
  </>
);

const FieldsFiles = ({ files }) => (
  <>
    <Form.FilsAvatar name="avatar" />
    <Form.FilsCoverImg name="coverImg" />
    <Form.FilsList name="files" cloud multiple />
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
              autoplay={{ delay: 2000 }}
            />
            <Slider.Nav />
          </div>
          <Slider.Thumbs />
        </Slider>
      )}
    </Slider.Lightbox>
    <Form.Label name="customSlider" />
    <Slider slides={files}>
      <div><Slider.Pg /></div>
      <div className="position-relative">
        <Slider.Body
          style={{ height: '50vh' }}
          autoplay={{ delay: 2000 }}
        >
          {({ slide }, i) => (
            <div className="d-flex h-100 flex-column">
              <Slider.Slide.Media file={slide} />
              <div
                className="position-relative my-auto w-100 text-white"
                style={{ padding: '0 5rem' }}
              >
                <h1 className="display-2 lh-1">
                  {demoTexts[i].title}
                </h1>
                <p>{demoTexts[i].text}</p>
                <a href="/" className="btn btn-secondary">
                  Read More
                </a>
              </div>
            </div>
          )}
        </Slider.Body>
        <Slider.Nav />
      </div>
      <Slider.Thumbs />
    </Slider>
  </>
);

const FieldsTime = () => (
  <>
    <Form.ISODate name="date" />
    <Form.ISOTime name="time" />
    <Form.ISODateTime name="datetime" />
    <Form.ISODateRange name="dateRange" />
    <Form.ISOTimeRange name="timeRange" />
  </>
);

const FieldsAddress = () => (
  <>
    <Form.Input
      name="address"
      helpText="Need Google API key in your .env file to work"
    />
    <Form.Coordinates
      name="location.coordinates"
    />
  </>
);

const FieldsArray = () => (
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
);

const FieldsRelations = () => (
  <>
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
  </>
);

const FieldsCalendar = () => (
  <Cal
    api={{ url: '/api/access-logs/all' }}
    field="createdAt"
  >
    <Cal.Header />
    <Cal.Body />
  </Cal>
);

const PageExample = () => {
  const [disabled, setDisabled] = useState(false);

  return (
    <Doc _id="new" api={{ url: '/api/example' }}>
      {(doc) => (
        <Page
          header={{ title: 'Example' }}
        >
          <Doc.Form
            defaults={defaults}
            schema={schema(doc)}
            disabled={disabled}
          >
            {({ values }) => {
              const files = values.files.length ? values.files : demoSlides;

              return (
                <>
                  <Doc.Ctrls>
                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn btn-neutral"
                        onClick={() => setDisabled(!disabled)}
                      >
                        <FA icon={disabled ? faUnlock : faLock} />
                      </button>
                    </div>
                  </Doc.Ctrls>

                  <Tabs route>
                    <Tab eventKey="general"><FieldsGeneral /></Tab>
                    <Tab eventKey="files"><FieldsFiles files={files} /></Tab>
                    <Tab eventKey="time"><FieldsTime /></Tab>
                    <Tab eventKey="address"><FieldsAddress /></Tab>
                    <Tab eventKey="array"><FieldsArray /></Tab>
                    <Tab eventKey="relations"><FieldsRelations /></Tab>
                    <Tab eventKey="calendar"><FieldsCalendar /></Tab>
                  </Tabs>
                </>
              );
            }}
          </Doc.Form>
        </Page>
      )}
    </Doc>
  );
};

export default PageExample;
