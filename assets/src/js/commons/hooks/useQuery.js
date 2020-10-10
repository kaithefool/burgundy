import { useLocation } from 'react-router-dom';
import qs from 'qs';

export default function useQuery() {
  const loc = useLocation();

  return qs.parse(loc.search, { ignoreQueryPrefix: true });
}
