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

function useHttpFileUpload() {
  const { res, req, fetched } = useHttp();

  const onFile = (api, files) => req(
    files instanceof FileList || Array.isArray(files)
      ? Array.from(files).map((f) => makeReq(api, f))
      : makeReq(api, files),
    { uploadProgress: true },
  );

  return { res, req: onFile, fetched };
}

export default useHttpFileUpload;
