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
}) => {
  const { req, res } = useHttp();

  const remove = () => req({
    url: api,
    method: 'delete',
    data: { _id: selected.map((s) => s._id) },
  });

  return (
    <>
      {confirm && (
        <ModalConfirm>
          Are you sure?
        </ModalConfirm>
      )}
      <BtnHttp
        res={res}
        className="btn btn-primary"
      >
        <FA icon={faTrash} fixedWidth />
      </BtnHttp>
    </>
  );
};

export default ListCtrlRemove;
