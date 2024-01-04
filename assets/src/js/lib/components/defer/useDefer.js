import { useContext, useEffect } from 'react';

import DeferContext from './DeferContext';

/**
 * @param {import('../../hooks/useHttp').HttpState} [http]
 * @param {import('./DeferContext').DeferConfig} [config]
 * @returns {import('./DeferContext').default}
 */
function useDefer(http, config = {}) {
  const ctx = useContext(DeferContext);

  useEffect(() => {
    if (http) ctx.add(http, config);
  }, [http?.res?.status]);

  return ctx;
}

export default useDefer;
