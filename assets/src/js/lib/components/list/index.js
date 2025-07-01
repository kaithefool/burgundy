import ListContext from './ListContext';
import ListProvider from './ListProvider';
import ListSearch from './ListSearch';
import ListStatus from './ListStatus';
import ListTable from './ListTable';
import ListGroups from './ListGroups';
import ListTruncate from './ListTruncate';
import ctrl from './ctrl';
import pg from './pg';
import flt from './flt';
import useList from './useList';
import ListRows from './ListRows';

export {
  ListContext,
  ListProvider,
  ListSearch,
  ListStatus,
  ListTable,
  ListRows,
  ListGroups,
  ListTruncate,
  ctrl,
  pg,
  flt,
  useList,
};

const List = ListProvider;

List.Provider = ListProvider;
List.Search = ListSearch;
List.Status = ListStatus;
List.Table = ListTable;
List.Rows = ListRows;
List.Groups = ListGroups;
List.Truncate = ListTruncate;
List.Ctrl = ctrl;
List.Pg = pg;
List.Flt = flt;

export default List;
