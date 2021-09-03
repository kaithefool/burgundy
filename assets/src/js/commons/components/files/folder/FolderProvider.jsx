import React, { useState } from 'react';

import File from '../file';

import FolderContext from './FolderContext';
import form from '../../../helpers/form';

const FolderProvider = ({
  api,
  initValue = [],
  multiple = false, // Boolean or max no. of files
  onChange = () => {},
  accept,
  maxSize,
  children,
}) => {
  const [files, setFiles] = useState(initValue);

  const push = (fs) => {
    const err = form.validateFiles(fs, { accept, maxSize });

    if (multiple) {
      setFiles(files.concat(fs).slice(0, Number(multiple)));
    } else {
      setFiles([fs[0]]);
    }
  };

  const update = (draft = []) => {
    setFiles(draft);
    onChange(draft.filter((d) => d && !(d instanceof File)));
  };

  const replace = (index, value) => {
    update([...files].splice(index, 1, value));
  };

  const value = {
    api,
    accept,
    maxSize,
    files,
    push,
    update,
    replace,
  };

  return (
    <FolderContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </FolderContext.Provider>
  );
};

export default FolderProvider;
