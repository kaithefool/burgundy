import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { useTranslation } from 'react-i18next';

import BtnHttp from '../../btns/BtnHttp';
import useList from '../useList';
import useHttp from '../../../hooks/useHttp';

const ListCtrlRemove = ({
  api: apiOpts,
  confirm = true,
  className = 'btn px-2 me-3 btn-neutral',
  ...props
}) => {
  const { t } = useTranslation();
  const { api, refresh, selected } = useList();
  const { req, res } = useHttp();

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
    <BtnHttp
      req={remove}
      res={res}
      className={className}
      icon={faTrash}
      alert={{ success: () => ({ children: t('res.deleted') }) }}
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
