import React from 'react';
import { useTranslation } from 'react-i18next';

import useList from '../useList';

const ListPagination = ({
  className = 'form-select',
  limits = [20, 40, 60],
}) => {
  const { t } = useTranslation();
  const {
    query: { limit },
    fetch,
  } = useList();

  return (
    <select
      className={className}
      value={limit}
      onChange={(e) => {
        const { value } = e.target;

        fetch({ limit: Number(value), skip: 0 });
      }}
    >
      {limits.map((l) => (
        <option value={l} key={l}>
          {t('gen.perPage', { page: l })}
        </option>
      ))}
    </select>
  );
};

export default ListPagination;
