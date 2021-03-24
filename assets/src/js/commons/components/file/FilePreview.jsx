import React, { useEffect, useState } from 'react';

function isPreviewable(mime) {
  return [
    'image/gif',
    'image/jpeg',
    'image/png',
  ].includes(mime);
}

const FilePreview = ({
  className = 'img-bg',
  file,
}) => {
  const [display, setDisplay] = useState(null);

  useEffect(() => {
    if (isPreviewable(file?.mime)) {
      if (file instanceof File) {
        setDisplay(URL.createObjectURL(file));
      } else {
        setDisplay(file.url);
      }
    } else {
      setDisplay(null);
    }
  }, [
    file instanceof File,
    isPreviewable(file?.mime),
    file?.name,
    file?.lastModified,
  ]);

  return display && (
    <div
      className={className}
      style={{ backgroundImage: `url('${display}')` }}
    ></div>
  );
};

export default FilePreview;
