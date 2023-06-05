import React from 'react';

import useHttp from '../../../hooks/useHttp';
import BtnHttp from '../../btns/BtnHttp';
import useList from '../useList';
import useAlert from '../../alert/useAlert';

const ListCtrlPatch = ({
  icon,
  api: apiOpts,
  updates,
  className = 'btn px-2 me-3 btn-neutral',
}) => {
  const http = useHttp();
  const { api, refresh, selected } = useList();

  useAlert(http.res);

  const patch = async () => {
    await http.req({
      method: 'patch',
      data: {
        _id: selected.map((s) => s._id),
        ...updates,
      },
      ...api,
      ...apiOpts,
    });

    refresh();
  };

  if (!selected.length) return '';

  return (
    <BtnHttp
      res={http.res}
      className={className}
      onClick={patch}
      icon={icon}
    />
  );
};

export default ListCtrlPatch;
