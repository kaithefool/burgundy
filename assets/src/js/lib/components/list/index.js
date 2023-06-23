import ListContext from './ListContext';
import ListProvider from './ListProvider';
import ListSearch from './ListSearch';
import ListStatus from './ListStatus';
import ListTable from './ListTable';
import ListGroups from './ListGroups';
import ListTruncate from './ListTruncate';
import ctrl from './ctrl';
import pg from './pg';
import useList from './useList';

export {
  ListContext,
  ListProvider,
  ListSearch,
  ListStatus,
  ListTable,
  ListGroups,
  ListTruncate,
  ctrl,
  pg,
  useList,
};

const List = ListProvider;

List.Provider = ListProvider;
List.Search = ListSearch;
List.Status = ListStatus;
List.Table = ListTable;
List.Groups = ListGroups;
List.Truncate = ListTruncate;
List.Ctrl = ctrl;
List.Pg = pg;

export default List;
