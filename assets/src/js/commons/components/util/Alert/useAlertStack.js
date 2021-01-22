import { useContext, useEffect } from 'react';

import AlertCtx from './AlertCtx';

function useAlertStack(res, {
  onError = true,
  onSuccess = true,
} = {}) {
  const { pushAlert } = useContext(AlertCtx);

  useEffect(() => {
    if (res?.status === 'error') {
      pushAlert({
        theme: 'danger',
        children: res.payload,
      });
    }
    if (res?.status === 'success') {
      pushAlert({
        theme: 'success',
        children: res.payload,
      });
    }
  }, [res?.status]);
}

export default useAlertStack;
