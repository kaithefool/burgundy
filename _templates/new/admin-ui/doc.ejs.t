---
to: assets/src/js/admin/components/pages/Page<%= n.singular.pascal %>.jsx
---
import React from 'react';
import { object, string } from 'yup';

import Page from '../layout/Page';
import Doc from '../layout/Doc';
import Form from '~/commons/components/form';
import BtnHttpDel from '../btns/BtnHttpDel';
import usePath from '~/commons/hooks/usePath';

const PageUser = ({ match }) => {
  const { _id } = match.params;
  const { pushPath } = usePath();

  return (
    <Doc _id={_id} api={{ url: '/api/<%= n.plural.path %>' }}>
      {(doc) => (
        <Page
          header={{
            breadcrumb: [
              { to: '../', children: '<%= n.plural.title %>' },
            ],
            title: doc?._id || 'New',
          }}
        >
          <Form
            api={{
              url: `/api/<%= n.plural.path %>/${doc ? _id : ''}`,
              method: doc ? 'patch' : 'post',
            }}
            stored={doc}
            defaults={{}}
            schema={object({})}
            onSubmitted={({ data }) => {
              if (!doc) pushPath(data._id);
            }}
          >
            <div className="row mb-3">
              <div className="col">
                <Form.BtnSubmit />
              </div>
              <div className="col-auto">
                {doc && (
                  <BtnHttpDel
                    api={{ url: `/api/<%= n.plural.path %>/${_id}` }}
                    redirect=".."
                  />
                )}
              </div>
            </div>


          </Form>
        </Page>
      )}
    </Doc>
  );
};

export default Page<%= n.singular.pascal %>;