---
to: assets/src/js/admin/components/pages/Page<%= n.singular.pascal %>.jsx
---
import React from 'react';
import { object } from 'yup';

import Page from '../layout/Page';
import Doc from '../layout/Doc';
import Form from '~/commons/components/form';

const defaults = {
};

const schema = () => object({
});

const Page<%= n.singular.pascal %> = (<% if (!singleton) { %>{
  match: { params: { _id } },
}<% } %>) => (
  <Doc
    <%= singleton ? 'singleton' : '_id={_id}' %>
    api={{ url: '/api/<%= n.plural.path %>' }}
  >
    {(doc) => (
      <Page
        header={{
          breadcrumb: [
            { to: '../', children: '<%= n.plural.title %>' },
          ],
          title: doc?._id || 'New',
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
<% if (!singleton) { %>            <div className="col text-end">
              <Doc.BtnDel />
            </div><% } %>
          </div>

          {/* fields */}

        </Doc.Form>
      </Page>
    )}
  </Doc>
);

export default Page<%= n.singular.pascal %>;
