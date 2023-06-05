import React from 'react';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons/faFileAlt';

import { useHttpFileUpload } from '../../../hooks/useHttp';
import BtnHttp from '../../btns/BtnHttp';
import Fils from '../../fils';
import useList from '../useList';
import useAlert from '../../alert/useAlert';

const ListCtrlImport = ({
  api: apiOpts,
  className = 'btn btn-neutral px-2',
  template,
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
    <div className="btn-group me-3">
      <BtnHttp
        res={res}
        className={`${className} position-relative`}
        icon={faUpload}
      >
        <Fils
          onDraft={upload}
          accept="text/csv"
          {...props}
        />
      </BtnHttp>
      {template && (
        <a
          target="_blank"
          href={template}
          className="btn btn-outline-neutral px-2"
          rel="noreferrer"
        >
          <FA icon={faFileAlt} className="me-1" fixedWidth />
          {t('importTmpl')}
        </a>
      )}

    </div>
  );
};

export default ListCtrlImport;
