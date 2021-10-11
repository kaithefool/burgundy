import React from 'react';

import ListContext from './ListContext';
import ListPagination from './ListPagination';
import ListColsToggle from './ListColsToggle';
import ListProvider from './ListProvider';
import ListSearch from './ListSearch';
import ListStatus from './ListStatus';
import ListTable from './ListTable';
import ctrl from './ctrl';
import useList from './useList';

export {
  ListContext,
  ListPagination,
  ListColsToggle,
  ListProvider,
  ListSearch,
  ListStatus,
  ListTable,
  ctrl,
  useList,
};

const List = (props) => <ListProvider {...props} />;

List.Pagination = ListPagination;
List.ColsToggle = ListColsToggle;
List.Provider = ListProvider;
List.Search = ListSearch;
List.Status = ListStatus;
List.Table = ListTable;
List.Ctrl = ctrl;

export default List;
