import React from 'react';

import Form from '~/commons/components/form';
import useDoc from './useDoc';
import usePath from '~/commons/hooks/usePath';

const DocForm = (props) => {
  const { api, _id, doc } = useDoc();
  const { pushPath } = usePath();

  return (
    <Form
      api={{
        ...api,
        url: `${api.url}/${doc ? _id : ''}`,
        method: doc ? 'patch' : 'post',
      }}
      stored={doc}
      onSubmitted={({ data }) => {
        if (!doc) pushPath(data._id);
      }}
      {...props}
    />
  );
};

export default DocForm;
