import React, { useEffect } from 'react';
import DocContext from './DocContext';
import Fetchable from '~/commons/components/util/Fetchable';
import useHttp from '~/commons/hooks/useHttp';

const DocProvider = ({
  api,
  _id,
  children,
}) => {
  const http = useHttp();
  const value = {
    api,
    _id,
    doc: http?.res?.payload,
  };

  useEffect(() => {
    if (_id !== 'new') {
      http.req({ ...api, url: `${api.url}/${_id}` });
    }
  }, []);

  return (
    <DocContext.Provider value={value}>
      {_id === 'new' ? (
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
