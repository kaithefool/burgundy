import React from 'react';

import ListPgSkip from './ListPgSkip';
import ListPgLimit from './ListPgLimit';
import ListPgCols from './ListPgCols';

export {
  ListPgSkip,
  ListPgLimit,
  ListPgCols,
};

const Pg = () => (
  <div className="row">
    <div className="col-auto">
      <ListPgCols />
    </div>
    <div className="col-auto">
      <ListPgLimit />
    </div>
    <ListPgSkip className="col-auto" />
  </div>
);

Pg.Skip = ListPgSkip;
Pg.Limit = ListPgLimit;
Pg.Cols = ListPgCols;

export default Pg;
