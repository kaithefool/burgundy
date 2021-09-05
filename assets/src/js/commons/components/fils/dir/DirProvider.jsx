import React, { useState } from 'react';

import DirContext from './DirContext';
import form from '../../../helpers/form';

const DirProvider = ({
  api,
  initValue = [],
  multiple = false, // Boolean or max no. of files
  onChange = () => {},
  accept,
  maxSize,
  children,
}) => {
  const [files, setFils] = useState(initValue);

  const push = (fs) => {
    const err = form.validateFils(fs, { accept, maxSize });

    if (multiple) {
      setFils(files.concat(fs).slice(0, Number(multiple)));
    } else {
      setFils([fs[0]]);
    }
  };

  const update = (draft = []) => {
    setFils(draft);
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
    <DirContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </DirContext.Provider>
  );
};

export default DirProvider;
