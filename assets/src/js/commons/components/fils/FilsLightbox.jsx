import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import FilsSlideShow from './FilsSlideShow';

const FilsLightbox = ({
  files,
  children,
}) => {
  const [show, setShow] = useState(false);
  const imgs = files.filter((f) => f.type.split('/')[0] === 'image');

  const turnOn = (file) => {
    const i = typeof file === 'number'
      ? file
      : imgs.findIndex(
        (f) => f.path === file.path || (f.key && f.key === file.key),
      );

    if (i === -1) return false;

    setShow(i);
    return true;
  };

  return (
    <>
      {typeof children === 'function' ? children({ turnOn }) : children}
      <Modal
        fullscreen
        show={show !== false}
        onHide={() => setShow(false)}
        contentClassName="bg-transparent"
        backdropClassName="opacity-75"
      >
        <Modal.Body>
          <FilsSlideShow
            className="h-100"
            files={files}
            initSlide={show}
            controls={(
              <button
                type="button"
                className="btn btn-link text-white"
                onClick={() => setShow(false)}
              >
                <FA icon={faTimes} size="lg" />
              </button>
            )}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FilsLightbox;
