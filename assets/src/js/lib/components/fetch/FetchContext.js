import React from 'react';

export default React.createContext({
  /** @type {import('../../hooks/useHttp').HttpState} */
  http: {},
  /** @type {() => void} */
  refresh: () => {},
});
