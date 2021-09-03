import React from 'react';

export default React.createContext({
  file: undefined,
  http: {},
  cancel: () => {},
});
