import React from 'react';

import useList from '../useList';

const ListPagination = ({
  className = 'form-select',
  limits = [20, 40, 60],
}) => {
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

        fetch({ limit: Number(value) });
      }}
    >
      {limits.map((l) => (
        <option value={l} key={l}>
          {`${l} / page`}
        </option>
      ))}
    </select>
  );
};

export default ListPagination;
