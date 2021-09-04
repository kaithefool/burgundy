import React, { useEffect, useState } from 'react';

import useFile from './useFile';

function isPreviewable(mime) {
  return [
    'image/gif',
    'image/jpeg',
    'image/png',
  ].includes(mime);
}

const FilePreview = ({
  className = 'img-bg',
}) => {
  const { file } = useFile();
  const [display, setDisplay] = useState(null);
  const previewable = isPreviewable(file?.type);

  useEffect(() => {
    if (previewable) {
      if (file instanceof File) {
        setDisplay(URL.createObjectURL(file));
      } else {
        setDisplay(`/uploads/${file.path}`);
      }
    } else {
      setDisplay(null);
    }
  }, [
    file instanceof File,
    previewable,
    file?.path || file?.key,
  ]);

  return display && (
    <div
      className={className}
      style={{ backgroundImage: `url('${display}')` }}
    />
  );
};

export default FilePreview;
