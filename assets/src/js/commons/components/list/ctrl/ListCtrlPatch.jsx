import React from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';

import useHttp from '../../../hooks/useHttp';
import BtnHttp from '../../btns/BtnHttp.jsx';
import useList from '../useList';

const ListCtrlPatch = ({
  opts: {
    icon,
    attrs,
  } = {},
  api,
  className = 'btn btn-link',
}) => {
  const { req, res } = useHttp();
  const { refresh, selected } = useList();

  const patch = async () => {
    await req({
      ...api,
      method: 'patch',
      data: {
        _id: selected.map((s) => s._id),
        ...attrs,
      },
    });
    refresh();
  };

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
