import useHttpBase from './useHttpBase';

export default () => {
  const [res, req, fetched] = useHttpBase();

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
    });
  };

  return [res, onFile, fetched];
};
