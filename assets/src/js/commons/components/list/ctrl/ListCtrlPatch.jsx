import React from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';

import useHttp from '../../../hooks/useHttp';
import BtnHttp from '../../btns/BtnHttp';
import useList from '../useList';
import useAlert from '../../alert/useAlert';

const ListCtrlPatch = ({
  icon,
  api: apiOpts,
  updates,
  className = 'btn-list-ctrl',
}) => {
  const { res, req } = useHttp();
  const { api, refresh, selected } = useList();

  useAlert(res);

  const patch = async () => {
    await req({
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
      res={res}
      className={className}
      onClick={patch}
    >
      <FA icon={icon} fixedWidth />
    </BtnHttp>
  );
};

export default ListCtrlPatch;
