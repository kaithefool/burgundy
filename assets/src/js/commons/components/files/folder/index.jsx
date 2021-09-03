import React from 'react';

import FolderAlert from './FolderAlert';
import FolderClick from './FolderClick';
import FolderContext from './FolderContext';
import FolderDrop from './FolderDrop';
import FolderProvider from './FolderProvider';
import useFolder from './useFolder';

export {
  FolderAlert,
  FolderClick,
  FolderContext,
  FolderDrop,
  FolderProvider,
  useFolder,
};

const Folder = (props) => <FolderProvider {...props} />;

Folder.FolderAlert = FolderAlert;
Folder.FolderClick = FolderClick;
Folder.FolderContext = FolderContext;
Folder.FolderDrop = FolderDrop;
Folder.FolderProvider = FolderProvider;

export default Folder;
