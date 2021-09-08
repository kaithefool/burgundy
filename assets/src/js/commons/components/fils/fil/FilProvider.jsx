import React, { useEffect } from 'react';

import { useHttpFileUpload } from '../../../hooks/useHttp';
import FilContext from './FilContext';
import useDir from '../dir/useDir';

const FilProvider = ({
  file,
  onChange = () => {},
  children,
}) => {
  const { api } = useDir();
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
    file.key,
  ]);

  useEffect(() => {
    if (http.res?.status === 'success') {
      onChange({
        ...http.res.payload,
        key: file.key, // keep the same key
      });
    }
  }, [http.res?.status]);

  const value = {
    file,
    http,
    cancel,
  };

  return (
    <FilContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </FilContext.Provider>
  );
};

export default FilProvider;
