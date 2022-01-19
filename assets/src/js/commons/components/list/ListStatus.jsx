import React from 'react';
import { useTranslation } from 'react-i18next';

import useList from './useList';
import Pending from '../util/Pending';
import Error from '../util/Error';

const ListStatus = ({
  children,
  empty,
  className = 'position-relative',
  ...props
}) => {
  const { res, rows } = useList();
  const { t } = useTranslation();
  const emptyLabel = empty ?? t('res.noRecord');

  return (
    <div {...props} className={className}>
      {res.status === 'pending' && (
        <Pending />
      )}
      {res.status === 'error' && (
        <Error res={res} />
      )}
      {rows.length ? children : emptyLabel}
    </div>
  );
};

export default ListStatus;
