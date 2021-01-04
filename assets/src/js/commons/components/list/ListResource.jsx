import React, { useState } from 'react';

import ListHttpTable from './ListHttpTable.jsx';
import ListSearch from './ListSearch.jsx';
import ListCtrls from './ctrls/ListCtrls.jsx';

const ListResource = ({
  filter = {},
  searchable,
  searchDebouc,
  searchPlaceholder,
  ctrls,
  selectable = false,
  ...props
}) => {
  const { api } = props;
  const [refreshCount, setRefreshCount] = useState(0);
  const [search, setSearch] = useState({});
  const [selected, setSelected] = useState();

  const refresh = () => setRefreshCount(refreshCount + 1);
  const f = { ...filter, ...search };

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
        {...{
          api, refresh, ctrls, selected, filter: f,
        }}
      />
      <ListHttpTable
        {...props}
        refreshCount={refreshCount}
        filter={f}
        onSelect={selectable ? setSelected : null}
      />
    </>
  );
};

export default ListResource;
