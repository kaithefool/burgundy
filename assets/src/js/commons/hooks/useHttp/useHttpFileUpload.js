import useHttpBase from './useHttpBase';

function useHttpFileUpload() {
  const { res, req, fetched } = useHttpBase();

  const onFile = (api = {}, file) => {
    const fd = new FormData();

    fd.append('file', file);

    return req({
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: fd,
      ...api,
    }, { uploadProgress: true });
  };

  return { res, req: onFile, fetched };
}

export default useHttpFileUpload;
