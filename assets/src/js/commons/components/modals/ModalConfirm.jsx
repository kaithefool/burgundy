import React from 'react';
import BModal from 'react-bootstrap/Modal';

const ModalConfirm = ({
  onConfirm = () => {},
  children,
  ...props
}) => (
  <BModal
    {...props}
  >
    <BModal.Body>
      {children}
      <div className="form-row">
        <div className="col">
          <button
            className="btn btn-outline-primary"
            onClick={props.onHide}
          >
            Cancel
          </button>
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            onClick={() => {
              onConfirm();
              props.onHide();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </BModal.Body>
  </BModal>
);

export default ModalConfirm;
