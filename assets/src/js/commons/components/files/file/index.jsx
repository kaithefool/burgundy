import React from 'react';

import FileContext from './FileContext';
import FilePreview from './FilePreview';
import FileProvider from './FileProvider';
import FileStatusIcon from './FileStatusIcon';
import FileTypeIcon from './FileTypeIcon';
import useFile from './useFile';

export {
  FileContext,
  FilePreview,
  FileProvider,
  FileStatusIcon,
  FileTypeIcon,
  useFile,
};

const File = (props) => <FileProvider {...props} />;

File.Context = FileContext;
File.Preview = FilePreview;
File.Provider = FileProvider;
File.StatusIcon = FileStatusIcon;
File.TypeIcon = FileTypeIcon;

export default File;
