import React from 'react';

export default React.createContext({
  api: {},
  accept: undefined,
  maxSize: undefined,
  multiple: false,
  files: [],

  push: () => {},
  replace: () => {},
  remove: () => {},
  swap: () => {},
  move: () => {},
  clear: () => {},
  update: () => {},
});
