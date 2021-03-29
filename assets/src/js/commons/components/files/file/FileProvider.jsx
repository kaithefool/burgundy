import React, { useEffect } from 'react';

import { useHttpFileUpload, useHttp } from '../../../hooks/useHttp';
import FileContext from './FileContext';

const FileProvider = ({
  api,
  file,
  suspended = false,
  onChange = () => {},
  children,
}) => {
  const uploadHttp = useHttpFileUpload();
  const removeHttp = useHttp();

  const remove = () => {
    // remove file request
    // How to determind if this is an unsaved edit?
    if (file && !(file instanceof File)) {
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
    if (file instanceof File && !suspended) {
      uploadHttp.req(api, file);
    }
  }, [
    suspended,
    file instanceof File,
    file?.name,
    file?.lastModified,
  ]);

  useEffect(() => {
    if (uploadHttp.res?.status === 'success') {
      onChange(uploadHttp.res.payload);
    }
  }, [uploadHttp.res?.status]);

  const values = {
    file,
    uploadHttp,
    removeHttp,
    remove,
  };

  return (
    <FileContext.Provider values={values}>
      {typeof children === 'function' ? children(values) : children}
    </FileContext.Provider>
  );
};

export default FileProvider;
