import FetchProvider from './FetchProvider';
import FetchContext from './FetchContext';
import FetchPending from './FetchPending';
import FetchError from './FetchError';
import useFetch from './useFetch';
import Fetch from './Fetch';

export {
  FetchProvider,
  FetchContext,
  FetchPending,
  FetchError,
  useFetch,
};

Fetch.Pending = FetchPending;
Fetch.Error = FetchError;

export default Fetch;
