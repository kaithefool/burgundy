import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { useTranslation } from 'react-i18next';

import BtnHttpConfirm from '../../btns/BtnHttpConfirm';
import useList from '../useList';
import useAlert from '../../alert/useAlert';
import useHttp from '../../../hooks/useHttp';

const ListCtrlRemove = ({
  api: apiOpts,
  confirm = true,
  className = 'btn px-2 me-3 btn-secondary',
  ...props
}) => {
  const { t } = useTranslation();
  const { api, refresh, selected } = useList();
  const { req, res } = useHttp();

  useAlert(res, { success: () => ({ children: t('res.deleted') }) });

  const remove = async () => {
    await req({
      method: 'delete',
      data: { _id: selected.map((s) => s._id) },
      ...api,
      ...apiOpts,
    });
    refresh();
  };

  if (selected.length <= 0) return '';

  return (
    <BtnHttpConfirm
      req={remove}
      res={res}
      className={className}
      icon={faTrash}
      confirm={
        confirm === true
          ? t('res.confirmDel')
          : confirm
      }
      {...props}
    />
  );
};

export default ListCtrlRemove;
