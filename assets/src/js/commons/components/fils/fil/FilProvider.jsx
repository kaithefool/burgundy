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
    <FilContext.Provider values={values}>
      {typeof children === 'function' ? children(values) : children}
    </FilContext.Provider>
  );
};

export default FilProvider;
