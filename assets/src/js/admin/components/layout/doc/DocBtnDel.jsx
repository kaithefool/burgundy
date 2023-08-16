import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import useHttp from '~/lib/hooks/useHttp';
import BtnHttp from '~/lib/components/btns/BtnHttp';
import { resolvePath } from '~/lib/helpers';

import useDoc from './useDoc';

const DocBtnDel = ({
  confirm = true,
  redirect = '..',
  ...props
}) => {
  const { t } = useTranslation();
  const { api, _id, doc } = useDoc();
  const http = useHttp();
  const navigate = useNavigate();

  if (!doc) return '';

  return (
    <BtnHttp
      alert={{ success: () => ({ children: t('res.deleted') }) }}
      res={http.res}
      req={async () => {
        await http.req({
          ...api,
          method: 'delete',
          url: `${api.url}/${_id}`,
        });

        if (redirect) {
          navigate(resolvePath(redirect));
        }
      }}
      icon={faTrash}
      confirm={
        confirm
          ? { body: t('res.confirmDel'), ...confirm }
          : confirm
      }
      {...props}
    />
  );
};

export default DocBtnDel;
