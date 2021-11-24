import React from 'react';

import ListContext from './ListContext';
import ListProvider from './ListProvider';
import ListSearch from './ListSearch';
import ListStatus from './ListStatus';
import ListTable from './ListTable';
import ctrl from './ctrl';
import pg from './pg';
import useList from './useList';

export {
  ListContext,
  ListProvider,
  ListSearch,
  ListStatus,
  ListTable,
  ctrl,
  pg,
  useList,
};

const List = (props) => <ListProvider {...props} />;

List.Provider = ListProvider;
List.Search = ListSearch;
List.Status = ListStatus;
List.Table = ListTable;
List.Ctrl = ctrl;
List.Pg = pg;

export default List;
