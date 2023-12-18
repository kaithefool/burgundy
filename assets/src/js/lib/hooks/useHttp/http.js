import axios from 'axios';
import qs from 'qs';

import successParser from './successParser';
import errorParser from './errorParser';

/**
 * @typedef {import("axios").AxiosRequestConfig} HttpRequest
 */

/**
 * @typedef {Object} HttpResponse
 * @property {('pending'|'success'|'error'|'canceled')} status
 * - The status of the request.
 * @property {any} payload - The response payload.
 * @property {number} code - The response code.
 * @property {number} progress - The progress of the request.
 */

/**
 * @callback httpCallback
 * @returns {HttpResponse}
 */

/**
 * @typedef {Object} HttpProgressOptions
 * @property {boolean} uploadProgress - Whether to track upload progress.
 * @property {boolean} downloadProgress - Whether to track download progress.
 */

/**
 * Makes an HTTP request using axios.
 *
 * @param {HttpRequest} request - The request options.
 * @param {httpCallback} callback - A Callback function to be called on
 * status and progress changes.
 * @param {HttpProgressOptions} progressOptions - The options for tracking
 * upload/download progress.
 *
 * @returns {Promise<HttpResponse>}
 */
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
        throw e;
      }
    }

    return { status: 'canceled' };
  })();

  // expose cancel fn
  promise.cancel = cancel;

  return promise;
}

export default http;
