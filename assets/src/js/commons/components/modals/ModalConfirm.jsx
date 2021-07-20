import React from 'react';
import Modal from './Modal';

const ModalConfirm = ({
  onConfirm = () => {},
  children,
  ...props
}) => {
  const { onHide } = props;

  return (
    <Modal
      {...props}
    >
      <div className="modal-body">
        {children}
        <div className="form-row">
          <div className="col">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={onHide}
            >
              Cancel
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                onConfirm();
                onHide();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
