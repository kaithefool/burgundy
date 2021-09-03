import React from 'react';

export default React.createContext({
  api: {},
  accept: undefined,
  maxSize: undefined,
  files: [],
  push: () => {},
  update: () => {},
  change: () => {},
});
