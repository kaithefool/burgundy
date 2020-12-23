import React from 'react';
import BModal from 'react-bootstrap/Modal';

const ModalConfirm = ({
  onConfirm = () => {},
  ...props
}) => (
  <BModal
    {...props}
  >

  </BModal>
);

export default ModalConfirm;
