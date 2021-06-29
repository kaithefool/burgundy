import axios from 'axios';
import env from './env';

axios.defaults.headers.common['x-csrf-token'] = env.csrf;

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    const { response } = err;

    // trigger auth redirects
    if ([401, 403].includes(response?.status)) {
      window.location.reload();
    }

    return Promise.reject(err);
  },
);

export default axios;
