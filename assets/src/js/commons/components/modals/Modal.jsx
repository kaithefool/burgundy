import React, { useRef, useEffect } from 'react';
import BModal from 'bootstrap/js/dist/modal';

const Modal = ({
  opts,
  children,
  className = '',
  show,
  onHide,
}) => {
  const elRef = useRef();
  const instRef = useRef();
  const showRef = useRef(show);

  showRef.current = show;

  const hideHandler = (e) => {
    if (showRef.current) {
      e.preventDefault();
      onHide();
    }
  };

  useEffect(() => {
    instRef.current = new BModal(elRef.current, opts);
    elRef.current
      .addEventListener('hide.bs.modal', hideHandler);

    // clean up
    return () => instRef.current.dispose();
  }, []);

  useEffect(() => {
    if (show) {
      instRef.current.show();
    } else {
      instRef.current.hide();
    }
  }, [show]);

  return (
    <div ref={elRef} className="modal">
      <div className={`modal-dialog ${className}`}>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
