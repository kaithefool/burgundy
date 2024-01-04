import axios from 'axios';
import qs from 'qs';

import * as parsers from './parsers';
import fileUploadConfig from './fileUploadConfig';

/**
 * @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig
 */

/**
 * @typedef {Object} AddtlRequestConfig
 * @property {File} [file] - A file to be uploaded. If provided, additional
 * default config will be applied. See {@link fileUploadConfig}.
 * @property {boolean} [uploadProgress] - Whether to track upload progress.
 * @property {boolean} [downloadProgress] - Whether to track download progress.
 */

/**
 * @typedef {AddtlRequestConfig & AxiosRequestConfig} HttpRequest
 */

/**
 * @callback httpCallback
 * @param {HttpResponse} response
 */

/**
 * @typedef {Object} HttpResponse
 * @property {('pending'|'success'|'error'|'canceled')} status
 * - The status of the request.
 * @property {any} payload - The response payload.
 * @property {number} code - The response code.
 * @property {number} progress - The progress of the request (0-1).
 */

/**
 * Makes an HTTP request using axios.
 *
 * @param {HttpRequest} request - The request options.
 * @param {httpCallback} callback - A Callback to be called on
 * status and progress changes.
 *
 * @returns {Promise<HttpResponse>}
 */
function http({ file, ...request }, callback = () => {}) {
  let cancel;
  const opts = {
    paramsSerializer: (params) => (
      qs.stringify(params, { strictNullHandling: true })
    ),
    timeout: 30 * 1000,
    cancelToken: new axios.CancelToken((c) => {
      cancel = c;
    }),
    ...file && fileUploadConfig(file),
    ...request,
  };
  const { uploadProgress, downloadProgress, ...config } = opts;

  // track progress
  if (uploadProgress) {
    config.onUploadProgress = (e) => {
      if (request.onUploadProgress) request.onUploadProgress(e);
      callback(parsers.pending(e.loaded / e.total));
    };
  }
  if (downloadProgress) {
    config.onDownloadProgress = (e) => {
      if (request.onDownloadProgress) request.onDownloadProgress(e);
      callback(parsers.pending(e.loaded / e.total));
    };
  }

  const promise = (async () => {
    callback(parsers.pending(0));

    try {
      const r = await axios(config);

      callback(parsers.success(r));

      return r;
    } catch (e) {
      if (!axios.isCancel(e)) {
        callback(parsers.error(e));
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
