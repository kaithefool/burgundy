import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import BtnHttp from './BtnHttp';
import ModalConfirm from '../modals/ModalConfirm';

const BtnHttpConfirm = ({
  req,
  confirm = true,
  typeToConfirm = false,
  ...props
}) => {
  const { t } = useTranslation();
  const [confirmModal, setConfirmModal] = useState(false);
  const body = typeof confirm !== 'boolean'
    ? confirm : t('res.confirm');

  return (
    <>
      {confirm && (
        <ModalConfirm
          show={confirmModal}
          onConfirm={() => req()}
          onHide={() => setConfirmModal(false)}
          typeToConfirm={typeToConfirm}
          body={body}
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

export default BtnHttpConfirm;
