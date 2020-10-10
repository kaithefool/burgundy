import React from 'react';

import ListHttpSelectable from './ListHttpSelectable.jsx';
import ListTable from './ListTable.jsx';

const ListHttpTable = ({
  cols,
  onRowClick,
  ...props
}) => (
  <ListHttpSelectable
    {...props}
  >
    {({
      fetched,
      fetch,
      query,
      ...selectProps
    }) => (
      <ListTable
        {...{
          cols,
          rows: fetched?.payload?.rows || [],
          onRowClick,
          sort: query.sort,
          onSort: (s) => fetch({ sort: s }),
          ...selectProps,
        }}
      />
    )}
  </ListHttpSelectable>
);

export default ListHttpTable;
