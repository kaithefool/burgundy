import React from 'react';
import { DateTime as dt } from 'luxon';
import { useTranslation } from 'react-i18next';

import useDoc from './useDoc';

const DocUpdatedAt = ({
  className = 'small text-muted',
  format = dt.DATETIME_SHORT,
}) => {
  const { doc } = useDoc();
  const { t } = useTranslation();
  const d = doc?.updatedAt || doc?.createdAt;

  if (!d) return '';

  return (
    <span className={className}>
      {t('fields.updatedAt', 'Updated at')}
      {': '}
      {dt.fromISO(d).toLocaleString(format)}
    </span>
  );
};

export default DocUpdatedAt;
