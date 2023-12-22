const fileUploadConfig = (file) => {
  const fd = new FormData();

  fd.append('file', file);

  return {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: fd,
    timeout: 60 * 60 * 1000,
    uploadProgress: true,
  };
};

export default fileUploadConfig;
