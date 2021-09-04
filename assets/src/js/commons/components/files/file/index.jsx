import React from 'react';

import FileContext from './FileContext';
import FilePreview from './FilePreview';
import FileProvider from './FileProvider';
import FileStatusIcon from './FileStatusIcon';
import FileTypeIcon from './FileTypeIcon';
import FileName from './FileName';
import useFile from './useFile';

export {
  FileContext,
  FilePreview,
  FileProvider,
  FileStatusIcon,
  FileTypeIcon,
  FileName,
  useFile,
};

const File = (props) => <FileProvider {...props} />;

File.Context = FileContext;
File.Preview = FilePreview;
File.Provider = FileProvider;
File.StatusIcon = FileStatusIcon;
File.TypeIcon = FileTypeIcon;
File.Name = FileName;

export default File;
