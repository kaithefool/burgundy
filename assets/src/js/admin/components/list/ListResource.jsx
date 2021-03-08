import React from 'react';

import List from '~/commons/components/list';

const ListResource = ({
  api,
  initQuery,
  filter,
  selectable,

  searchable,
  ctrls,

  ...props
}) => (
  <List.Provider
    {...{
      api,
      initQuery,
      filter,
      selectable,
    }}
  >
    {searchable && (
      <List.Search {...searchable} />
    )}
    <List.Ctrls
      {...{ api, ctrls }}
    />
    <List.Status />
    <List.Table {...props} />
  </List.Provider>
);

export default ListResource;
