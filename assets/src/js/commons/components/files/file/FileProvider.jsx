import React, { useEffect } from 'react';

import { useHttpFileUpload } from '../../../hooks/useHttp';
import FileContext from './FileContext';
import useFolder from '../folder/useFolder';

const FileProvider = ({
  file,
  onChange = () => {},
  children,
}) => {
  const { api } = useFolder();
  const http = useHttpFileUpload();

  // halt upload process
  const cancel = () => {
    if (http?.status === 'pending') {
      http.cancel();
    }
  };

  useEffect(() => {
    if (file instanceof File) {
      http.req(api, file);
    }
  }, [
    file instanceof File,
    file?.path || file?.key,
  ]);

  useEffect(() => {
    if (http.res?.status === 'success') {
      onChange(http.res.payload);
    }
  }, [http.res?.status]);

  const values = {
    file,
    http,
    cancel,
  };

  return (
    <FileContext.Provider values={values}>
      {typeof children === 'function' ? children(values) : children}
    </FileContext.Provider>
  );
};

export default FileProvider;
