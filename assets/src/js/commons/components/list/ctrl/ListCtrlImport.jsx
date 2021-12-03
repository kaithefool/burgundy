import React from 'react';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import { useTranslation } from 'react-i18next';

import { useHttpFileUpload } from '../../../hooks/useHttp';
import BtnHttp from '../../btns/BtnHttp';
import Fils from '../../fils';
import useList from '../useList';
import useAlert from '../../alert/useAlert';

const ListCtrlImport = ({
  api: apiOpts,
  className = 'btn px-2 me-3 btn-secondary',
  ...props
}) => {
  const { res, req } = useHttpFileUpload();
  const { api: listApi, refresh } = useList();
  const { t } = useTranslation();

  useAlert(res, {
    success: () => ({ children: t('res.imported') }),
  });

  const upload = async (files) => {
    await req({
      ...listApi,
      url: `${listApi.url}/import`,
      ...apiOpts,
    }, files[0]);

    refresh();
  };

  return (
    <BtnHttp
      res={res}
      className={`${className} position-relative`}
      icon={faUpload}
    >
      <Fils onDraft={upload} {...props} />
    </BtnHttp>
  );
};

export default ListCtrlImport;
