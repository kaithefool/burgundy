import React from 'react';

import BtnHttpConfirm from './BtnHttpConfirm';
import useHttp from '../../hooks/useHttp';
import useAlert from '../alert/useAlert';

const BtnApi = ({
  api,
  alertOpts = {},
  children,
}) => {
  const { res, req } = useHttp();

  useAlert(res, alertOpts);

  return (
    <BtnHttpConfirm
      req={() => (
        typeof api === 'function' ? api(req) : req(api)
      )}
      res={res}
    >
      {children}
    </BtnHttpConfirm>
  );
};

export default BtnApi;
