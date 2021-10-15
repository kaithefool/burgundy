import { useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';

export default function useQuery() {
  const loc = useLocation();
  const history = useHistory();

  return [
    qs.parse(loc.search, { ignoreQueryPrefix: true }),
    (q, replace = false) => {
      history[replace ? 'replace' : 'push'](
        `${loc.pathname}?${qs.stringify(q)}`,
      );
    },
  ];
}
