import React from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';

import useHttp from '../../../hooks/useHttp';
import BtnHttp from '../../btns/BtnHttp.jsx';

const ListCtrlPatch = ({
  opts: {
    icon,
    attrs,
  } = {},
  api,
  refresh,
  selected = [],
}) => {
  const { req, res } = useHttp();

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
      className="btn btn-primary"
      onClick={patch}
    >
      <FA icon={icon} fixedWidth />
    </BtnHttp>
  );
};

export default ListCtrlPatch;
