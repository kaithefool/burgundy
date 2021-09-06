import React, { useState } from 'react';
import mimer from 'mimer';
import { nanoid } from 'nanoid';
import Modal from 'react-bootstrap/Modal';

import DirContext from './DirContext';

const toMimes = (accept) => (
  accept
    .split(',')
    .map((a) => a.trim())
    .map((a) => (a.includes('/') ? a : mimer(a)))
);

const validateFiles = (files, {
  accept,
  maxSize,
} = {}) => {
  // only validate new uploads
  const toCheck = files.filter((f) => f instanceof File);

  // check the files' size
  if (
    maxSize
    && toCheck.find((f) => f.size > maxSize)
  ) {
    return 'maxSize';
  }
  // check acceptable files' types
  if (accept) {
    const mimes = toMimes(accept);

    if (!toCheck.find((f) => mimes.includes(f.type))) {
      return 'accept';
    }
  }

  return null;
};

const parseFiles = (files) => {
  files.forEach((f) => {
    if (!f.key) {
      f.key = nanoid();
    }
  });

  return files;
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
  const [showErr, setShowErr] = useState(false);
  const [files, setFiles] = useState(parseFiles(initValue));

  const update = (draft) => {
    const fs = parseFiles(draft);
    const err = validateFiles(fs, { accept, maxSize });

    if (!err) {
      setFiles(fs);
      onChange(fs.filter((f) => !(f instanceof File)));
    }
  };

  const push = (fileList) => {
    const fs = Array.from(fileList);
    let draft = [fs[0]];

    if (multiple) {
      draft = files.concat(fs).slice(0, Number(multiple));
    }

    update(draft);
  };

  const replace = (index, file) => {
    update([...files].splice(index, 1, file));
  };

  const remove = (index) => {
    update([...files].splice(index, 1));
  };

  const value = {
    api,
    accept,
    maxSize,
    files,
    push,
    replace,
    remove,
  };

  return (
    <DirContext.Provider value={value}>
      <>
        <Modal show={showErr} onHide={setShowErr(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Invalid files
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-danger"
              onClick={setShowErr(false)}
            >
              OK
            </button>
          </Modal.Footer>
        </Modal>
        {typeof children === 'function' ? children(value) : children}
      </>
    </DirContext.Provider>
  );
};

export default DirProvider;
