import React from 'react';

import useFetch from './useFetch';
import Error from '../util/Error';

const FetchError = () => {
  const { status, http } = useFetch();

  if (status !== 'error') return '';

  return (
    <Error res={http.res} />
  );
};

export default FetchError;
