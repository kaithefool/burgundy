import React, { useState } from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

import useHttp from '../../../hooks/useHttp';
import BtnHttp from '../../btns/BtnHttp.jsx';
import ModalConfirm from '../../modals/ModalConfirm.jsx';

const ListCtrlRemove = ({
  opts: { confirm = true } = {},
  api,
  selected = [],
  refresh,
  className = 'btn btn-link',
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { req, res } = useHttp();

  const remove = async () => {
    await req({
      ...api,
      method: 'delete',
      data: { _id: selected.map((s) => s._id) },
    });
    refresh();
  };

  return (
    <>
      {confirm && (
        <ModalConfirm
          show={showConfirm}
          onConfirm={remove}
          onHide={() => setShowConfirm(false)}
        >
          Are you sure to delete?
        </ModalConfirm>
      )}
      {selected.length > 0 && (
        <BtnHttp
          res={res}
          className={className}
          onClick={() => {
            if (confirm) {
              setShowConfirm(true);
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
