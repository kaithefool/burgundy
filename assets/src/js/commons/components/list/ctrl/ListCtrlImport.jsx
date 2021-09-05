import React from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';

import { useHttpFileUpload } from '../../../hooks/useHttp';
import BtnHttp from '../../btns/BtnHttp';
import Fils from '../../fils';
import useList from '../useList';
import useAlert from '../../alert/useAlert';

const ListCtrlImport = ({
  api: apiOpts,
  className = 'btn btn-link',
  ...props
}) => {
  const { res, req } = useHttpFileUpload();
  const { api, refresh } = useList();

  useAlert(res, {
    success: () => ({ children: 'Imported' }),
  });

  const upload = async (files) => {
    await req({
      ...api,
      ...apiOpts,
    }, files[0]);

    refresh();
  };

  return (
    <BtnHttp
      res={res}
      className={className}
    >
      <FA icon={faUpload} fixedWidth />
      <Fils onChange={upload} {...props} />
    </BtnHttp>
  );
};

export default ListCtrlImport;
