import useHttp from './useHttp';

const makeReq = (api, file) => {
  const fd = new FormData();

  fd.append('file', file);

  return {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: fd,
    timeout: 60 * 60 * 1000,
    ...api,
  };
};

/**
 * @typedef {import('./useHttp').HttpRequest} HttpRequest
 * @typedef {import('./useHttp').HttpResponse} HttpResponse
 * @typedef {import('./useHttp').HttpState} HttpState
 */

/**
 * @callback httpFileStateRequest
 * @param {HttpRequest} api
 * @param {FileList|Array<File>} FileList
 *
 * @returns {Promise<HttpResponse>}
 *
 * @typedef {Object} HttpFileState
 * @property {httpFileStateRequest} req
 */

/**
 * Same as useHttp, but with config for file upload
 *
 * @returns {HttpFileState & HttpState}
 */
function useHttpFileUpload() {
  const http = useHttp();

  return {
    ...http,
    req: (api, files) => http.req(
      files instanceof FileList || Array.isArray(files)
        ? Array.from(files).map((f) => makeReq(api, f))
        : makeReq(api, files),
      { uploadProgress: true },
    ),
  };
}

export default useHttpFileUpload;
