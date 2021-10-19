import React, { useState } from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

import useHttp from '../../../hooks/useHttp';
import BtnHttp from '../../btns/BtnHttp';
import ModalConfirm from '../../modals/ModalConfirm';
import useList from '../useList';
import useAlert from '../../alert/useAlert';

const ListCtrlRemove = ({
  api: apiOpts,
  confirm = 'Are you sure to delete?',
  className = 'btn px-2 me-3 border',
}) => {
  const { api, refresh, selected } = useList();
  const [confirmModal, setConfirmModal] = useState(false);
  const { req, res } = useHttp();

  useAlert(res, { success: { children: 'Removed' } });

  const remove = async () => {
    await req({
      method: 'delete',
      data: { _id: selected.map((s) => s._id) },
      ...api,
      ...apiOpts,
    });
    refresh();
  };

  return (
    <>
      {confirm && (
        <ModalConfirm
          show={confirmModal}
          onConfirm={remove}
          onHide={() => setConfirmModal(false)}
        >
          {confirm}
        </ModalConfirm>
      )}
      {selected.length > 0 && (
        <BtnHttp
          res={res}
          className={className}
          onClick={() => {
            if (confirm) {
              setConfirmModal(true);
            } else {
              remove();
            }
          }}
        >
          <FA icon={faTrash} fixedWidth />
        </BtnHttp>
      )}
    </>
  );
};

export default ListCtrlRemove;
