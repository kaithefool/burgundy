import React, { useState } from 'react';

import ListHttpTable from '~/commons/components/list/ListHttpTable.jsx';
import ListSearch from '~/commons/components/list/ListSearch.jsx';
import ListCtrls from './ctrls/ListCtrls.jsx';

const ListResouce = ({
  filter = {},
  searchable,
  searchDebouc,
  searchPlaceholder,
  children,
  ctrls,
  ...props
}) => {
  const { api } = props;
  const [refreshCount, setRefreshCount] = useState(0);
  const [search, setSearch] = useState({});

  const refresh = () => setRefreshCount(refreshCount + 1);

  return (
    <>
      {searchable && (
        <ListSearch
          opts={searchable}
          onSearch={setSearch}
          debounce={searchDebouc}
          placeholder={searchPlaceholder}
        />
      )}
      <ListCtrls
        {...{ api, refresh, ctrls }}
      >
        {children({ refresh })}
      </ListCtrls>
      <ListHttpTable
        {...props}
        filter={{
          ...filter,
          ...search,
        }}
      />
    </>
  );
};

export default ListResouce;
