import React from 'react';
import { DateTime as dt } from 'luxon';

import useDoc from './useDoc';

const DocUpdatedAt = ({
  className = 'small text-muted',
  format = dt.DATETIME_SHORT,
}) => {
  const { doc } = useDoc();
  const t = doc?.updatedAt || doc?.createdAt;

  if (!t) return '';

  return (
    <span className={className}>
      Updated at
      {' '}
      {dt.fromISO(t).toLocaleString(format)}
    </span>
  );
};

export default DocUpdatedAt;
