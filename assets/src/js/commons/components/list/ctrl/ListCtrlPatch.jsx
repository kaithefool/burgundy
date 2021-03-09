import React from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';

import useHttp from '../../../hooks/useHttp';
import BtnHttp from '../../btns/BtnHttp.jsx';
import useList from '../useList';

const ListCtrlPatch = ({
  icon,
  api: apiOpts,
  updates,
  className = 'btn btn-link',
}) => {
  const { res, req } = useHttp();
  const { api, refresh, selected } = useList();

  const patch = async () => {
    await req({
      method: 'patch',
      data: {
        id: selected.map((s) => s.id),
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
