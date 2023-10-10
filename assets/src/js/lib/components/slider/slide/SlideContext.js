import React from 'react';

export default React.createContext({
  slide: null,
  index: -1,
  player: {},
  autoplaying: false,
  isCurrent: false,
});
