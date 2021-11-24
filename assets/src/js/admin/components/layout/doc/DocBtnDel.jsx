import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { useTranslation } from 'react-i18next';

import useHttp from '~/commons/hooks/useHttp';
import BtnHttpConfirm from '~/commons/components/btns/BtnHttpConfirm';
import usePath from '~/commons/hooks/usePath';
import useAlert from '~/commons/components/alert/useAlert';

import useDoc from './useDoc';

const DocBtnDel = ({
  confirm = true,
  redirect = '..',
  ...props
}) => {
  const { t } = useTranslation();
  const { api, _id } = useDoc();
  const http = useHttp();
  const { pushPath } = usePath();

  useAlert(http.res, { success: () => ({ children: t('res.deleted') }) });

  return (
    <BtnHttpConfirm
      res={http.res}
      req={async () => {
        await http.req({
          ...api,
          method: 'delete',
          url: `/api/users/${_id}`,
        });

        if (redirect) {
          pushPath(redirect);
        }
      }}
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

export default DocBtnDel;
