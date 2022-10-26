import React, { useEffect } from 'react';

import { useHttpFileUpload } from '../../../hooks/useHttp';
import FilContext from './FilContext';
import useDir from '../dir/useDir';
import useAlert from '../../alert/useAlert';

const FilProvider = ({
  file,
  children,
}) => {
  const { api, replace, remove } = useDir();
  const http = useHttpFileUpload();

  useAlert(http.res, { success: false });

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
      replace(file.key, {
        ...http.res.payload,
        key: file.key, // keep the same key
      });
    }

    return () => {
      cancel();
    };
  }, [http.res?.status]);

  const value = {
    file,
    http,
    cancel,
    remove: () => remove(file.key),
  };

  return (
    <FilContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </FilContext.Provider>
  );
};

export default FilProvider;
