import React from 'react';
import { object } from 'yup';
import { useParams } from 'react-router-dom';

import Page from '../layout/Page';
import Doc from '../layout/doc';
import Form from '~/commons/components/form';
import LngTabs from '../layout/LngTabs';
import env from '../../../commons/config/env';

const defaults = {
  url: '',
  redirect: '',
  active: true,
  title: env.lngs.reduce((a, l) => ({
    ...a, [l]: '',
  }), {}),
  body: env.lngs.reduce((a, l) => ({
    ...a, [l]: '',
  }), {}),
};

const schema = () => object({
});

const PageView = () => {
  const { _id } = useParams();

  return (
    <Doc
      _id={_id}
      api={{ url: '/api/views' }}
    >
      {(doc) => (
        <Page
          header={{
            title: doc?.url || 'New',
          }}
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

            {/* fields */}
            <Form.Check name="active" type="switch" />
            <div className="row">
              <div className="col">
                <Form.Input name="url" />
              </div>
              <div className="col">
                <Form.Input name="redirect" />
              </div>
            </div>

            <LngTabs>
              {(lng) => (
                <>
                  <Form.Input name={`title.${lng}`} />
                  <Form.Editor name={`body.${lng}`} />
                </>
              )}
            </LngTabs>

          </Doc.Form>
        </Page>
      )}
    </Doc>
  );
};

export default PageView;
