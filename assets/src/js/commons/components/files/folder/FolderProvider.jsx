import React, { useState } from 'react';

import File from '../file';

import FolderContext from './FolderContext';
import form from '../../../helpers/form';

const FolderProvider = ({
  api,
  initValue = [],
  multiple = false,
  onChange = () => {},
  reorderable = false,
  accept,
  maxSize,
  children,
}) => {
  const [files, setFiles] = useState(initValue);

  const push = (fs) => {
    const err = form.validateFolder(fs, { accept, maxSize });

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

  const change = (index, value) => {
    const args = [index, value];

    if (value) args.push(value);
    update([...files].splice(args));
  };

  const value = {
    api,
    accept,
    maxSize,
    files,
    push,
    update,
    change,
  };

  return (
    <FolderContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </FolderContext.Provider>
  );
};

export default FolderProvider;
