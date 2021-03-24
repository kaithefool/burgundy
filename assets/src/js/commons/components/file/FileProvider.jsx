import React, { useEffect } from 'react';

import { useHttpFileUpload } from '../../hooks/useHttp';

const FileProvider = ({
  api,
  value,
  onChange = () => {},
  children,
}) => {
  const http = useHttpFileUpload();
  const { res, req } = http;

  const remove = () => {
    // remove file request
    // halt upload process
  };

  useEffect(() => {
    if (value instanceof File) {
      req(api, value);
    }
  }, [
    value instanceof File,
    value?.name,
    value?.lastModified,
  ]);

  useEffect(() => {
    if (res?.status === 'success') {
      onChange(res.payload);
    }
  }, [res?.status]);

  return <>
    {children({ file: value, remove, ...http })}
  </>;
};

export default FileProvider;
