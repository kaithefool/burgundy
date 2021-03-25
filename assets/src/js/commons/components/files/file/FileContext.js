import React from 'react';

export default React.createContext({
  file: undefined,
  remove: () => {},
  uploadHttp: {},
  removeHttp: {},
});
