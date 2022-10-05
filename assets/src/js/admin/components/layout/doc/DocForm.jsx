import React from 'react';
import { useNavigate } from 'react-router-dom';

import Form from '~/commons/components/form';
import { resolvePath } from '~/commons/helpers';
import useDoc from './useDoc';

const DocForm = (props) => {
  const {
    api, _id, doc, singleton,
  } = useDoc();
  const navigate = useNavigate();

  const a = singleton
    ? { ...api, method: 'patch' }
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
        if (!doc) navigate(resolvePath('..', data._id));
      }}
      {...props}
    />
  );
};

export default DocForm;
