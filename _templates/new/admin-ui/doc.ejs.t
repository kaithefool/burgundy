---
to: assets/src/js/admin/components/pages/Page<%= n.singular.pascal %>.jsx
---
import React from 'react';
import { object, string } from 'yup';

import Page from '../layout/Page';
import Doc from '../layout/Doc';
import Form from '~/commons/components/form';
import usePath from '~/commons/hooks/usePath';
<% if (!singleton) { %>
import BtnHttpDel from '../btns/BtnHttpDel';
<% } %>

const defaults = {
};

const schema = (doc) => object({
});

const Page<%= n.singular.pascal %> = (<% if (!singleton) { %>{
  match: { params: { _id } },
}<% } %>) => (
  <Doc
<% if (singleton) { %>
    singleton
<% } else { %>
    _id={_id}
<% } %>
    _id={_id}
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
<% if (!singleton) { %>
            <div className="col text-end">
              <Doc.BtnDel />
            </div>
<% } %>
          </div>

          {/* fields */}

        </Doc.Form>
      </Page>
    )}
  </Doc>
);

export default Page<%= n.singular.pascal %>;