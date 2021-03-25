import React from 'react';

import useFile from './useFile';
import Pending from '../../util/Pending.jsx';
import Error from '../../util/Error.jsx';

const FileStatus = () => {
  const {
    uploadHttp: { res },
  } = useFile();
  const { progress, status } = res;

  if (status === 'pending') return <Pending progress={progress} />;
  if (status === 'error') return <Error />;

  return <></>;
};

export default FileStatus;
