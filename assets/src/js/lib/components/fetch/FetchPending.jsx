import React from 'react';

import useFetch from './useFetch';
import Pending from '../util/Pending';

const FetchPending = () => {
  const { status, http } = useFetch();

  if (status !== 'error') return '';

  return (
    <Pending res={http.res} />
  );
};

export default FetchPending;
