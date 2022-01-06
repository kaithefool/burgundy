import React, { useEffect } from 'react';
import DocContext from './DocContext';
import Fetchable from '~/commons/components/util/Fetchable';
import useHttp from '~/commons/hooks/useHttp';

const DocProvider = ({
  api,
  _id,
  singleton = false,
  children,
  resources = [],
}) => {
  const http = useHttp();
  const value = {
    api,
    _id,
    singleton,
    doc: resources.length
      ? http?.res?.payload?.[resources.length]
      : http?.res?.payload,
  };
  const requests = [...resources];

  if (_id !== 'new') {
    requests.push({
      ...api,
      url: singleton
        ? api.url
        : `${api.url}/${_id}`,
    });
  }

  useEffect(() => {
    if (requests.length) {
      http.req(resources.length ? requests : requests[0]);
    }
  }, [_id]);

  return (
    <DocContext.Provider value={value}>
      {!requests.length ? (
        children()
      ) : (
        <Fetchable res={http.res}>
          {children}
        </Fetchable>
      )}
    </DocContext.Provider>
  );
};

export default DocProvider;
