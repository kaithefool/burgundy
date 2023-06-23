import React from 'react';

import FetchContext from './FetchContext';
import useHttp from '../../hooks/useHttp';
import useFetch from './useFetch';

const FetchProvider = ({
  children,
  http: httpProp,
  req: reqProp,
  propagateRefresh = false,
}) => {
  const httpDef = useHttp(reqProp);
  const http = httpProp || httpDef;
  const { refresh: refreshParent } = useFetch();

  const refresh = () => {
    if (reqProp) {
      http.req(reqProp);

      if (propagateRefresh) refreshParent();
    }
  };

  const value = {
    ...http?.res,
    http,
    refresh,
  };

  return (
    <FetchContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </FetchContext.Provider>
  );
};

export default FetchProvider;
