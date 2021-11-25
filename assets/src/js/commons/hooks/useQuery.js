import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';

export default function useQuery() {
  const loc = useLocation();
  const navigate = useNavigate();

  return [
    qs.parse(loc.search, { ignoreQueryPrefix: true }),
    (q, replace = false) => {
      navigate(
        `${loc.pathname}?${qs.stringify(q)}`,
        { replace }
      );
    },
  ];
}
