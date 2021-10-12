import { useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';

export default function useQuery() {
  const loc = useLocation();
  const history = useHistory();

  return {
    query: qs.parse(loc.search, { ignoreQueryPrefix: true }),
    push(q) {
      history.push(`${loc.pathname}?${qs.stringify(q)}`);
    },
    replace(q) {
      history.replace(`${loc.pathname}?${qs.stringify(q)}`);
    },
  };
}
