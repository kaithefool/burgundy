import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

import BtnHttpConfirm from '../../btns/BtnHttpConfirm';
import useList from '../useList';
import useAlert from '../../alert/useAlert';
import useHttp from '../../../hooks/useHttp';

const ListCtrlRemove = ({
  api: apiOpts,
  confirm = 'Are you sure to delete?',
  className = 'btn px-2 me-3 border',
  ...props
}) => {
  const { api, refresh, selected } = useList();
  const { req, res } = useHttp();

  useAlert(res, { success: { children: 'Deleted' } });

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
      {selected.length > 0 && (
        <BtnHttpConfirm
          req={remove}
          res={res}
          className={className}
          icon={faTrash}
          confirm={confirm}
          {...props}
        />
      )}
    </>
  );
};

export default ListCtrlRemove;
