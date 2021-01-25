import { useContext, useEffect } from 'react';

import AlertCtx from './AlertCtx';

function useAlertStack(res, {
  onError = true,
  onSuccess = false,
} = {}) {
  const ctx = useContext(AlertCtx);

  useEffect(() => {
    if (onError && res?.status === 'error') {
      ctx.pushAlert({
        theme: 'danger',
        children: res.payload,
        ...(
          typeof onError === 'function'
            ? onError(res?.payload, res) : {}
        ),
      });
    }
    if (onSuccess && res?.status === 'success') {
      ctx.pushAlert({
        theme: 'success',
        children: res.payload,
        ...(
          typeof onSuccess === 'function'
            ? onSuccess(res?.payload, res) : {}
        ),
      });
    }
  }, [res?.status]);

  return ctx;
}

export default useAlertStack;
