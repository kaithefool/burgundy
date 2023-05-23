import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import SliderProvider from './SliderProvider';
import SliderNav from './SliderNav';
import SliderPg from './SliderPg';
import SliderBody from './SliderBody';
import SliderThumbs from './SliderThumbs';

const SliderLightbox = ({
  children,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const turnOn = (i) => {
    setShow(i);
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
          <SliderProvider
            initialSlide={show}
            {...props}
          >
            <div className="d-flex flex-column h-100">
              {/* header */}
              <div className="row g-0 align-items-center text-white">
                <div className="col"><SliderPg /></div>
                <div className="col-auto">
                  <button
                    type="button"
                    className="btn btn-link text-white"
                    onClick={() => setShow(false)}
                  >
                    <FA icon={faTimes} size="lg" />
                  </button>
                </div>
              </div>
              {/* body */}
              <div
                className="flex-fill position-relative"
              >
                <SliderBody className="h-100" />
                <SliderNav />
              </div>
              {/* thumbs footer */}
              <SliderThumbs />
            </div>
          </SliderProvider>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SliderLightbox;
