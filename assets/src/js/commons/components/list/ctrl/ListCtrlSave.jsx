import React from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';

import useHttp from '../../../hooks/useHttp';
import BtnHttp from '../../btns/BtnHttp';
import useList from '../useList';
import useAlert from '../../alert/useAlert';

const ListCtrlSave = ({
  api: apiOpts,
  className = 'btn btn-link',
}) => {
  const { api, staged } = useList();
  const { req, res } = useHttp();

  useAlert(res, { success: { children: 'Saved' } });

  const save = async () => {
    await req({
      method: 'patch',
      data: staged,
      ...api,
      ...apiOpts,
    });
  };

  if (!Object.keys(staged).length) return '';

  return (
    <BtnHttp
      res={res}
      className={className}
      onClick={save}
    >
      <FA icon={faSave} fixedWidth />
    </BtnHttp>
  );
};

export default ListCtrlSave;
