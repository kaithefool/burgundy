import React from 'react';

import useHttp from '../../../hooks/useHttp';
import BtnHttp from '../../btns/BtnHttp';
import useList from '../useList';

const ListCtrlPatch = ({
  api: apiOpts,
  updates,
  className = 'btn px-2 btn-neutral',
  ...props
}) => {
  const http = useHttp();
  const { api, refresh, selected } = useList();

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
      alert
      res={http.res}
      req={patch}
      className={className}
      {...props}
    />
  );
};

export default ListCtrlPatch;
