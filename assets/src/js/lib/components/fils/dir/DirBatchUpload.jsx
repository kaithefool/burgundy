// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';

import { useHttpFileUpload } from '../../../hooks/useHttp';
import useComparable from '../../../hooks/useComparable';
import useDir from './useDir';
import useAlert from '../../alert/useAlert';

const DirBatchUpload = ({
  children,
  onStatus = () => {},
}) => {
  const http = useHttpFileUpload();
  const { api, files, update } = useDir();

  useAlert(http.res, { success: false });

  // halt upload process
  const cancel = () => {
    if (http?.status === 'pending') {
      http.cancel();
    }
  };

  useEffect(() => {
    if (files.length) {
      http.req(api, files);
    }
  }, [useComparable(files.map((f) => f.key))]);

  useEffect(() => {
    if (http.res?.status === 'success') {
      update(http.res.payload.map((f, i) => ({
        ...f,
        key: files[i].key, // keep the same key
      })));
    }

    onStatus(http);

    return () => {
      cancel();
    };
  }, [http.res?.status]);

  const value = {
    http,
    cancel,
  };

  return (
    typeof children === 'function' ? children(value) : children
  );
};

export default DirBatchUpload;
