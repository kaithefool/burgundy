import React, { useState } from 'react';
import mimer from 'mimer';
import Modal from 'react-bootstrap/Modal';

import DirContext from './DirContext';
import { newKey } from '../../../hooks/useUniqKey';

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
    return 'err.file.maxSize';
  }
  // check acceptable files' types
  if (accept) {
    const mimes = toMimes(accept);

    if (!toCheck.find((f) => mimes.includes(f.type))) {
      return 'err.file.accept';
    }
  }

  return null;
};

const insertKeys = (files) => {
  files.forEach((f) => {
    if (!f.key) {
      f.key = newKey();
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
  const [err, setErr] = useState(false);
  const [files, setFiles] = useState(insertKeys(initValue));

  const update = (draft) => {
    const e = validateFiles(draft, { accept, maxSize });

    if (e) {
      setErr(e);
    } else {
      insertKeys(draft);
      setFiles(draft);
      onChange(draft.filter((f) => !(f instanceof File)));
    }
  };

  const findIndex = (key) => files.findIndex((f) => f.key === key);

  const push = (fileList) => {
    const fs = Array.from(fileList);
    let draft = [fs[0]];

    if (multiple) {
      draft = files.concat(fs).slice(0, Number(multiple));
    }

    update(draft);
  };

  const replace = (key, file) => {
    const draft = [...files];

    draft.splice(findIndex(key), 1, file);
    update(draft);
  };

  const remove = (key) => {
    const draft = [...files];

    draft.splice(findIndex(key), 1);
    update(draft);
  };

  const value = {
    api,
    accept,
    maxSize,
    multiple,
    files,
    push,
    replace,
    remove,
  };

  return (
    <DirContext.Provider value={value}>
      <>
        <Modal show={err} onHide={() => setErr(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {err}
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => setErr(false)}
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
