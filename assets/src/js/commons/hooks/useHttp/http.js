import axios from 'axios';
import qs from 'qs';

import successParser from './successParser';
import errorParser from './errorParser';

function http(request, callback = () => {}, {
  uploadProgress = false,
  downloadProgress = false,
} = {}) {
  let destroyed = false;
  const cb = (i) => !destroyed && callback(i);
  const opts = {
    paramsSerializer: (params) => (
      qs.stringify(params)
    ),
    timeout: 30 * 1000,
    ...request,
  };

  if (uploadProgress) {
    opts.onUploadProgress = (e) => {
      cb({ progress: e.loaded / e.total });
    };
  }
  if (downloadProgress) {
    opts.onDownloadProgress = (e) => {
      cb({ progress: e.loaded / e.total });
    };
  }

  return {
    destroy() {
      destroyed = true;
    },
    xhr: axios(opts)
      .then((r) => cb(successParser(r)))
      .catch((e) => cb(errorParser(e))),
  };
}

export default http;
