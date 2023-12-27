import { useContext, useEffect } from 'react';

import DeferContext from './DeferContext';

/**
 * @param {import('../../hooks/useHttp').HttpState} [http]
 * @returns {import('./DeferContext').default}
 */
function useDefer(http) {
  const ctx = useContext(DeferContext);

  useEffect(() => {
    if (http) ctx.add(http);
  }, [http?.res?.status]);

  return ctx;
}

export default useDefer;
