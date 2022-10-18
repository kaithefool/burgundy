import axios from 'axios';
import env from './env';

axios.defaults.headers.common['x-csrf-token'] = env.csrf;

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    const { status } = (err.response || {});

    // trigger auth redirects
    if (status === 401) {
      window.location.reload();
    }
    if (status === 403) {
      window.location.href = '/logout';
    }

    return Promise.reject(err);
  },
);

export default axios;
