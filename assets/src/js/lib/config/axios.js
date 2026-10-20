import axios from 'axios';

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    const { status, data } = err.response || {};

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
