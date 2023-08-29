import { useState } from 'react';

import useQuery from '../../hooks/useQuery';
import { mapDeep } from '../form/helpers';

// query string only support string value
const parseQuery = (q) => mapDeep(q, (v) => (
  typeof v === 'number' ? String(v) : v
));

function useListQuery({
  initQuery: iq,
  history = true,
  infinite,
}) {
  const initQuery = {
    ...!infinite && { skip: '0', limit: '20' },
    filter: {},
    ...iq,
  };
  const [urlQuery, setUrlQuery] = useQuery();
  const [stateQuery, setStateQuery] = useState(() => initQuery);

  const query = history ? {
    ...initQuery, ...urlQuery,
  } : stateQuery;

  const setQuery = (qu) => {
    const q = parseQuery(qu);

    if (history) {
      const {
        skip, limit, filter, sort,
      } = q;

      setUrlQuery({
        ...(skip !== initQuery.skip && { skip }),
        ...(limit !== initQuery.limit && { limit }),
        sort,
        filter,
      }, true);
    } else setStateQuery(q);
  };

  return { query, setQuery, initQuery };
}

export default useListQuery;
