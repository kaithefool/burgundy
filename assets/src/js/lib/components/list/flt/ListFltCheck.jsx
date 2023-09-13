import React from 'react';
import { useTranslation } from 'react-i18next';
import isEqual from 'lodash/isEqual';

import useUniqKey from '../../../hooks/useUniqKey';
import useList from '../useList';

const ListFltCheck = ({
  label, value, name,
  labelClassName = 'form-check-label',
  inputClassName = 'form-check-input',
  className = 'form-check form-check-inline',
  multiple,
  sort: sortFn = true,
  ...props
}) => {
  const [id] = useUniqKey();
  const { t } = useTranslation();
  const { fetch, query: { sort, filter } } = useList();
  const state = name === 'sort' ? sort : filter[name];
  const checked = multiple
    ? state?.includes(value) || false
    : isEqual(state, value);

  const toggle = () => {
    if (multiple) {
      const draft = (state || []).filter((v) => v !== value);

      if (!checked) draft.push(value);
      if (sortFn) {
        draft.sort(
          typeof sortFn === 'function' ? sortFn : undefined,
        );
      }
      fetch({ filter: { ...filter, [name]: draft } });
    } else {
      const draft = checked ? undefined : value;

      fetch(
        name === 'sort'
          ? { sort: draft }
          : { filter: { ...filter, [name]: draft } },
      );
    }
  };

  return (
    <div className={className}>
      <input
        id={id}
        className={inputClassName}
        type="checkbox"
        checked={checked}
        onChange={toggle}
        {...props}
      />
      <label className={labelClassName} htmlFor={id}>
        {t(label || value)}
      </label>
    </div>
  );
};

export default ListFltCheck;
