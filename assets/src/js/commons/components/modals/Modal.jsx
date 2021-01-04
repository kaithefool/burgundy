import React, { useRef, useEffect, useCallback } from 'react';
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
  const hideHandler = useCallback((e) => {
    if (show) {
      e.preventDefault();
      onHide();
    }
  }, [show]);

  useEffect(() => {
    instRef.current = new BModal(elRef.current, opts);

    return () => instRef.current.dispose();
  }, []);

  useEffect(() => {
    elRef.current
      .addEventListener('hide.bs.modal', hideHandler);

    if (show) {
      instRef.current.show();
    } else {
      instRef.current.hide();
    }

    return () => elRef.current
      .removeEventListener('hide.bs.modal', hideHandler);
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
