import React from 'react';

export default React.createContext({
  stack: [],

  push: () => {},
  remove: () => {},
});
