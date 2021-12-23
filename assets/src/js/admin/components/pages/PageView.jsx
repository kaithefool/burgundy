import React from 'react';
import { object, string } from 'yup';
import { useParams } from 'react-router-dom';

import Page from '../layout/Page';
import Doc from '../layout/doc';
import Form from '~/commons/components/form';
import LngTabs from '../layout/LngTabs';
import { reduceLng } from '~/commons/helpers';

const defaults = {
  url: '',
  active: false,
  title: reduceLng(''),
  body: reduceLng(''),
};

const schema = () => object({
  url: string().required(),
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
                <Doc.BtnPreview href={(v) => v.url} />
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
            <Form.Input name="url" />

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
