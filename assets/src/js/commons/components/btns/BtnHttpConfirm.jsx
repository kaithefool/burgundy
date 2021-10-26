import React, { useState } from 'react';

import BtnHttp from './BtnHttp';
import ModalConfirm from '../modals/ModalConfirm';

const BtnHttpDel = ({
  req,
  confirm = 'Are you sure?',
  typeToConfirm = false,
  ...props
}) => {
  const [confirmModal, setConfirmModal] = useState(false);

  return (
    <>
      {confirm && (
        <ModalConfirm
          show={confirmModal}
          onConfirm={() => req()}
          onHide={() => setConfirmModal(false)}
          typeToConfirm={typeToConfirm}
          body={confirm}
        />
      )}
      <BtnHttp
        onClick={() => {
          if (confirm) {
            setConfirmModal(true);
          } else {
            req();
          }
        }}
        {...props}
      />
    </>
  );
};

export default BtnHttpDel;
