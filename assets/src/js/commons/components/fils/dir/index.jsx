import React from 'react';

import DirClick from './DirClick';
import DirContext from './DirContext';
import DirDrop from './DirDrop';
import DirProvider from './DirProvider';
import useDir from './useDir';

export {
  DirClick,
  DirContext,
  DirDrop,
  DirProvider,
  useDir,
};

const Dir = (props) => <DirProvider {...props} />;

Dir.Click = DirClick;
Dir.Context = DirContext;
Dir.Drop = DirDrop;
Dir.Provider = DirProvider;

export default Dir;
