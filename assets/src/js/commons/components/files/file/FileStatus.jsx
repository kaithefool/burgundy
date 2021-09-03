import React from 'react';

import useFile from './useFile';
import Pending from '../../util/Pending';
import Error from '../../util/Error';

const FileStatus = () => {
  const {
    http: { res },
  } = useFile();
  const { progress, status } = res;

  if (status === 'pending') return <Pending progress={progress} />;
  if (status === 'error') return <Error />;

  return <></>;
};

export default FileStatus;
