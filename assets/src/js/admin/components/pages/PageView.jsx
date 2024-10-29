import React from 'react';
import { object, string } from 'yup';
import { useParams } from 'react-router-dom';

import Form from '~/lib/components/form';
import { reduceLng } from '~/lib/helpers';
import Page from '../layout/Page';
import Doc from '../layout/doc';
import LngTabs from '../layout/LngTabs';

const defaults = {
  url: '',
  active: false,
  title: reduceLng(''),
  body: reduceLng(''),
};

const schema = (doc) => object({
  ...!doc?.key && { url: string().required() },
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
            title: doc?.url || doc?.key || 'New',
          }}
        >
          <Doc.Form
            defaults={defaults}
            schema={schema(doc)}
          >
            <Doc.Ctrls preview={(v) => v.url} />

            {/* fields */}
            <Form.Check name="active" type="switch" />

            {!doc?.key && (
              <Form.Input name="url" />
            )}

            <LngTabs>
              {(lng) => (
                <>
                  <Form.Input name={`title.${lng}`} />
                  <Form.Textarea name={`body.${lng}`} />
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
