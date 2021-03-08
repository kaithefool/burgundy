import React from 'react';

import ListContext from './ListContext';
import ListPagination from './ListPagination.jsx';
import ListProvider from './ListProvider.jsx';
import ListSearch from './ListSearch.jsx';
import ListStatus from './ListStatus.jsx';
import ListTable from './ListTable.jsx';
import ctrl from './ctrl';
import useList from './useList';

export {
  ListContext,
  ListPagination,
  ListProvider,
  ListSearch,
  ListStatus,
  ListTable,
  ctrl,
  useList,
};

const List = (props) => <ListProvider {...props} />;

List.Pagination = ListPagination;
List.Provider = ListProvider;
List.Search = ListSearch;
List.Status = ListStatus;
List.Table = ListTable;
List.Ctrl = ctrl;

export default List;
