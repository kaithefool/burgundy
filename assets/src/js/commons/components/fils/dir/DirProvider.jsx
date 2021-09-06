import React, { useState } from 'react';
import mimer from 'mimer';
import { nanoid } from 'nanoid';

import DirContext from './DirContext';

const toMimes = (accept) => (
  accept
    .split(',')
    .map((a) => a.trim())
    .map((a) => (a.includes('/') ? a : mimer(a)))
);

const validateFiles = (filesList, {
  accept,
  maxSize,
} = {}) => {
  const files = Array.from(filesList);

  // check the files' size
  if (
    maxSize
    && files.find((f) => f.size > maxSize)
  ) {
    return 'maxSize';
  }
  // check acceptable files' types
  if (accept) {
    const mimes = toMimes(accept);

    if (!files.find((f) => mimes.includes(f.type))) {
      return 'accept';
    }
  }

  return null;
};

const assignFileKeys = (filesList) => {
  const files = Array.from(filesList);

  files.forEach((f) => {
    if (!f.path && !f.key) {
      f.key = nanoid();
    }
  });
};

const DirProvider = ({
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
    const err = validateFiles(fs, { accept, maxSize });

    assignFileKeys(fs);

    let draft = [fs[0]];

    if (multiple) {
      draft = files.concat(fs).slice(0, Number(multiple));
    }

    setFiles(draft);
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
    replace,
  };

  return (
    <DirContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </DirContext.Provider>
  );
};

export default DirProvider;
