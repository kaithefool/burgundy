import axios from 'axios';
import qs from 'qs';

import successParser from './successParser';
import errorParser from './errorParser';

function http(request, callback = () => {}, {
  uploadProgress = false,
  downloadProgress = false,
} = {}) {
  let cancel;
  const opts = {
    paramsSerializer: (params) => (
      qs.stringify(params, { strictNullHandling: true })
    ),
    timeout: 30 * 1000,
    cancelToken: new axios.CancelToken((c) => {
      cancel = c;
    }),
    ...request,
  };

  // progress
  if (uploadProgress) {
    opts.onUploadProgress = (e) => {
      callback({ progress: e.loaded / e.total });
    };
  }
  if (downloadProgress) {
    opts.onDownloadProgress = (e) => {
      callback({ progress: e.loaded / e.total });
    };
  }

  const promise = (async () => {
    try {
      const r = await axios(opts);

      callback(successParser(r));

      return r;
    } catch (e) {
      if (!axios.isCancel(e)) {
        callback(errorParser(e));
      }
      throw e;
    }
  })();

  // expose cancel fn
  promise.cancel = cancel;

  return promise;
}

export default http;
