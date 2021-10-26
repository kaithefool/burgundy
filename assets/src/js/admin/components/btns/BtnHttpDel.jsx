import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

import useHttp from '~/commons/hooks/useHttp';
import BtnHttpConfirm from '~/commons/components/btns/BtnHttpConfirm';
import usePath from '../../../commons/hooks/usePath';
import useAlert from '../../../commons/components/alert/useAlert';

const BtnHttpDel = ({
  api,
  confirm = 'Are you sure to delete?',
  redirect,
  ...props
}) => {
  const http = useHttp();
  const { req, res } = http;
  const { pushPath } = usePath();

  useAlert(http, { success: () => ({ children: 'Deleted' }) });

  return (
    <BtnHttpConfirm
      res={res}
      req={async () => {
        await req({
          method: 'delete',
          ...api,
        });

        if (redirect) {
          pushPath(redirect);
        }
      }}
      icon={faTrash}
      confirm={confirm}
      {...props}
    />
  );
};

export default BtnHttpDel;
