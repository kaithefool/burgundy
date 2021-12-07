---
to: assets/src/js/admin/components/pages/Page<%= n.singular.pascal %>.jsx
---
import React from 'react';
import { object } from 'yup';
<% if (!singleton) { %>import { useParams } from 'react-router-dom';
<% } %>
import Page from '../layout/Page';
import Doc from '../layout/doc';
import Form from '~/commons/components/form';

const defaults = {
};

const schema = () => object({
});

const Page<%= n.singular.pascal %> = () => {<% if (!singleton) { %>
  const { _id } = useParams();
<% } %>
  return (
    <Doc
      <%= singleton ? 'singleton' : '_id={_id}' %>
      api={{ url: '/api/<%= n.plural.param %>' }}
    >
      {(doc) => (
        <Page
          header={{
            <% if (!singleton) { %>breadcrumb: [
              { to: '../', children: '<%= n.plural.title %>' },
            ],
            title: doc?._id || 'New',<%
            } else { %>title: '<%= n.singular.title %>',<% } %>
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
};

export default Page<%= n.singular.pascal %>;
