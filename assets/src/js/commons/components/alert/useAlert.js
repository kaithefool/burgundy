import { useContext, useEffect } from 'react';

import AlertContext from './AlertContext';

function useAlert(http, {
  error = true,
  success = true,
} = {}) {
  const ctx = useContext(AlertContext);
  const { push, purge } = ctx;
  const httpStatus = http?.res?.status;

  useEffect(() => {
    if (httpStatus) {
      if (error && httpStatus === 'error') {
        push({
          dirty: true,
          theme: 'danger',
          children: http.res.payload?.message,
          ...(typeof error === 'function' ? error(http.res) : {}),
        });
      }
      if (success && httpStatus === 'success') {
        purge({
          theme: 'success',
          children: 'Done',
          ...(typeof success === 'function' ? success(http.res) : {}),
        });
      }
    }
  }, [httpStatus]);

  return ctx;
}

export default useAlert;
