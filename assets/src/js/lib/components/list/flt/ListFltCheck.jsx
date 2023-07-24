import React from 'react';
import { useTranslation } from 'react-i18next';

import useUniqKey from '../../../hooks/useUniqKey';
import useList from '../useList';

const ListFltCheck = ({
  label, value, name,

  ...props
}) => {
  const [id] = useUniqKey();
  const { t } = useTranslation();
  const { fetch, query } = useList();
  const values = query?.filter?.[name] ?? [];

  const toggle = () => {
    const i = values.findIndex((v) => v === value);
    const draft = [...values];

    if (i === -1) draft.push(value);
    else draft.splice(i, 1);

    fetch({
      filter: { ...query.filter, [name]: draft },
    });
  };

  return (
    <div className="form-check form-check-inline">
      <input
        id={id}
        className="form-check-input"
        type="checkbox"
        value={values.includes(value)}
        onChange={toggle}
        {...props}
      />
      <label className="form-check-label" htmlFor={id}>
        {t(label || value)}
      </label>
    </div>
  );
};

export default ListFltCheck;
