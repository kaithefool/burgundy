import React from 'react';

export default React.createContext({
  api: {},
  accept: undefined,
  maxSize: undefined,
  files: [],

  push: () => {},
  replace: () => {},
  remove: () => {},
  swap: () => {},
  move: () => {},
  clear: () => {},
  update: () => {},
});
