---
to: assets/src/js/admin/components/pages/Page<%= n.singular.pascal %>.jsx
---
import React from 'react';
import { object } from 'yup';
<% if (!singleton) { %>import { useParams } from 'react-router-dom';
<% } %>
import Form from '~/lib/components/form';
import Page from '../layout/Page';
import Doc from '../layout/doc';

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
            <% if (!singleton) { %>title: doc?._id || 'New',<%
            } else { %>title: '<%= n.singular.title %>',<% } %>
          }}
        >
          <Doc.Form
            defaults={defaults}
            schema={schema(doc)}
          >
            <Doc.Ctrls updatedAt<% if (!singleton) { %> del<% } %> />

            {/* fields */}

          </Doc.Form>
        </Page>
      )}
    </Doc>
  );
};

export default Page<%= n.singular.pascal %>;
