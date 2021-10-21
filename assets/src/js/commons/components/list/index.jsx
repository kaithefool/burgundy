import React from 'react';

import ListContext from './ListContext';
import ListColsToggle from './ListColsToggle';
import ListProvider from './ListProvider';
import ListSearch from './ListSearch';
import ListStatus from './ListStatus';
import ListTable from './ListTable';
import ctrl from './ctrl';
import pg from './pg';
import useList from './useList';

export {
  ListContext,
  ListColsToggle,
  ListProvider,
  ListSearch,
  ListStatus,
  ListTable,
  ctrl,
  pg,
  useList,
};

const List = (props) => <ListProvider {...props} />;

List.ColsToggle = ListColsToggle;
List.Provider = ListProvider;
List.Search = ListSearch;
List.Status = ListStatus;
List.Table = ListTable;
List.Ctrl = ctrl;
List.Pg = pg;

export default List;
