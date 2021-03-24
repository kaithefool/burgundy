import React, { useEffect } from 'react';

import { useHttpFileUpload, useHttp } from '../../hooks/useHttp';
import FileContext from './FileContext';

const FileProvider = ({
  api,
  value,
  suspended = false,
  onChange = () => {},
  children,
}) => {
  const uploadHttp = useHttpFileUpload();
  const removeHttp = useHttp();

  const remove = () => {
    // remove file request
    if (value && !(value instanceof File)) {
      removeHttp.req({
        ...api,
        method: 'delete',
      });
    }

    // halt upload process
    uploadHttp.cancel();

    onChange();
  };

  useEffect(() => {
    if (value instanceof File && !suspended) {
      uploadHttp.req(api, value);
    }
  }, [
    suspended,
    value instanceof File,
    value?.name,
    value?.lastModified,
  ]);

  useEffect(() => {
    if (uploadHttp.res?.status === 'success') {
      onChange(uploadHttp.res.payload);
    }
  }, [uploadHttp.res?.status]);

  const values = {
    file: value,
    uploadHttp,
    removeHttp,
    remove,
  };

  return (
    <FileContext.Provider values={values}>
      {typeof children === 'function' ? children(value) : children}
    </FileContext.Provider>
  );
};

export default FileProvider;
