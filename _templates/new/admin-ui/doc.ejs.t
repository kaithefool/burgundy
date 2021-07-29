---
to: assets/src/js/components/pages/<%= n.plural.camel %>/Page<%= n.singular.pascal %>.jsx
---
import React from 'react';
import { useHistory } from 'react-router-dom';
import { object } from 'yup';

import Page from '../../layout/Page';
import Doc from '../../layout/Doc';
import Form from '~/commons/components/form';

const Page<%= model %> = ({ match }) => {
  const { id } = match.params;
  const history = useHistory();

  return (
    <Doc
      id={id}
      api={{ url: '/api/<%= n.plural.path %>' }}
    >
      {(doc) => (
        <Page
          header={{
            breadcrumb: [
              { to: '../', children: '<%= n.plural.title %>' },
            ],
            title: doc.id || 'New <%= n.singular.title %>',
          }}
        >
          <Form
            api={{
              url: `/api/<%= n.plural.path %>/${doc ? id : ''}`,
              method: doc ? 'patch' : 'post',
            }}
            stored={doc}
            defaults={{
            }}
            schema={object({
            })}
            onSubmitted={({ payload }) => {
              if (!doc) history.push(payload.id);
            }}
          >
            <Form.BtnSubmit />
          </Form>
        </Page>
      )}
    </Doc>
  );
};

export default Page<%= model %>;
