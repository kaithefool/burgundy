import { useContext, useEffect } from 'react';

import AlertContext from './AlertContext';

function useAlert(httpRes, {
  error = true,
  success = true,
} = {}) {
  const ctx = useContext(AlertContext);
  const { push, purge } = ctx;
  const httpStatus = httpRes?.status;

  useEffect(() => {
    if (httpStatus) {
      if (error && httpStatus === 'error') {
        push({
          dirty: true,
          theme: 'danger',
          children: httpRes.payload?.message,
          ...(typeof error === 'function' ? error(httpRes) : {}),
        });
      }
      if (success && httpStatus === 'success') {
        purge({
          theme: 'success',
          children: 'Done',
          expires: 10 * 1000,
          ...(typeof success === 'function' ? success(httpRes) : {}),
        });
      }
    }
  }, [httpStatus]);

  return ctx;
}

export default useAlert;
