import React, {
  useEffect, useState, useCallback,
} from 'react';

import useFil from './useFil';

export const previewables = [
  'image/gif',
  'image/jpeg',
  'image/png',
  'video/mp4',
  'video/webm',
];

export const isPreviewable = (fileType) => (
  previewables.find((p) => p === fileType)
);

const FilPreview = ({
  className = 'img-bg',
  video: {
    playing = false,
    ...video
  } = {},
}) => {
  const { file } = useFil();
  const [display, setDisplay] = useState(null);
  const previewable = previewables.includes(file?.type);
  const videoRef = useCallback((node) => {
    if (node && node.paused === playing) {
      node.currentTime = 0;
      node[playing ? 'play' : 'pause']();
    }
  }, [playing]);

  useEffect(() => {
    if (previewable) {
      if (file instanceof File) {
        setDisplay(URL.createObjectURL(file));
      } else if (file.path.match('/')) {
        setDisplay(file.path);
      } else {
        setDisplay(`/uploads/${file.path}`);
      }
    } else {
      setDisplay(null);
    }
  }, [
    file instanceof File,
    previewable,
    file?.key,
  ]);

  return display && (
    <div
      className={className}
      {...file.type.match(/^image/) && {
        style: { backgroundImage: `url('${display}')` },
      }}
    >
      {file.type.match(/^video/) && (
        <video ref={videoRef} {...video}>
          <source src={display} type={file.type} />
        </video>
      )}
    </div>
  );
};

export default FilPreview;
