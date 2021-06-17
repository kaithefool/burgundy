import React from 'react';

import FileContext from './FileContext';
import FilePreview from './FilePreview';
import FileProvider from './FileProvider';
import FileStatus from './FileStatus';
import useFile from './useFile';

export {
  FileContext,
  FilePreview,
  FileProvider,
  FileStatus,
  useFile,
};

const File = (props) => <FileProvider {...props} />;

File.Context = FileContext;
File.Preview = FilePreview;
File.Provider = FileProvider;
File.Status = FileStatus;

export default File;
