import { useContext, useEffect } from 'react';

import AlertContext from './AlertContext';

function useAlert(httpRes, {
  error = true,
  success = true,
} = {}) {
  const ctx = useContext(AlertContext);
  const { push, purge } = ctx;

  useEffect(() => {
    if (httpRes) {
      const { status } = httpRes;

      if (error && status === 'error') {
        push({
          dirty: true,
          theme: 'danger',
          children: httpRes.payload,
          ...(typeof error === 'function' ? error(httpRes) : {}),
        });
      }
      if (success && status === 'success') {
        purge({
          theme: 'success',
          children: 'Done',
          ...(typeof success === 'function' ? success(httpRes) : {}),
        });
      }
    }
  }, [httpRes?.status]);

  return ctx;
}

export default useAlert;
