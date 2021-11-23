import React from 'react';

import Form from '~/commons/components/form';
import useDoc from './useDoc';
import usePath from '~/commons/hooks/usePath';

const DocForm = (props) => {
  const {
    api, _id, doc, singleton,
  } = useDoc();
  const { pushPath } = usePath();

  const a = singleton
    ? { ...api, method: 'put' }
    : {
      ...api,
      url: `${api.url}/${doc ? _id : ''}`,
      method: doc
        ? 'patch' : 'post',
    };

  return (
    <Form
      api={a}
      stored={doc}
      onSubmitted={({ data }) => {
        if (!doc) pushPath(data._id);
      }}
      {...props}
    />
  );
};

export default DocForm;
