import React from 'react';

import ListPgSkip from './ListPgSkip';
import ListPgLimit from './ListPgLimit';
import ListPgCols from './ListPgCols';
import ListPgMore from './ListPgMore';

export {
  ListPgSkip,
  ListPgLimit,
  ListPgCols,
  ListPgMore,
};

const Pg = ({
  limit = true,
  skip = true,
  cols = true,
}) => (
  <div className="row g-2">
    {limit && (
      <div className="col-auto">
        <ListPgLimit {...limit} />
      </div>
    )}
    {skip && (
      <ListPgSkip className="col-auto" {...skip} />
    )}
    {cols && (
      <div className="col-auto">
        <ListPgCols />
      </div>
    )}
  </div>
);

Pg.Skip = ListPgSkip;
Pg.Limit = ListPgLimit;
Pg.Cols = ListPgCols;
Pg.More = ListPgMore;

export default Pg;
