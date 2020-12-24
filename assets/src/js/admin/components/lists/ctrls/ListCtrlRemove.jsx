import React from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

import useHttp from '~/commons/hooks/useHttp';
import BtnHttp from '~/commons/components/btns/BtnHttp.jsx';
import ModalConfirm from '~/commons/components/modals/ModalConfirm.jsx';

const ListCtrlRemove = ({
  confirm = true,
  api,
  selected = [],
  refresh,
}) => {
  const { req, res } = useHttp();

  const remove = async () => {
    await req({
      url: api,
      method: 'delete',
      data: { _id: selected.map((s) => s._id) },
    });
    refresh();
  };

  return (
    <>
      {confirm && (
        <ModalConfirm
          onConfirm={remove}
        >
          Are you sure to delete?
        </ModalConfirm>
      )}
      <BtnHttp
        res={res}
        className="btn btn-primary"
        onClick={() => {
          if (confirm) {

          } else {
            remove();
          }
        }}
      >
        <FA icon={faTrash} fixedWidth />
      </BtnHttp>
    </>
  );
};

export default ListCtrlRemove;
