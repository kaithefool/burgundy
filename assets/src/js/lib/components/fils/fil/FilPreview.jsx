import React, {
  useEffect, useState, useCallback,
} from 'react';
import ReactPlayer from 'react-player';

import useFil from './useFil';

export const previewables = [
  'image/gif',
  'image/jpeg',
  'image/png',
  'video/mp4',
  'video/webm',
  'cloud/youtube',
  'cloud/vimeo',
];

export const isPreviewable = (fileType) => (
  previewables.find((p) => p === fileType)
);

export const isPlayable = (fileType) => (
  !!isPreviewable(fileType)?.match(/^(video|cloud)\//)
);

const FilPreview = ({
  className = 'img-bg',
  player = {},
}) => {
  const { file } = useFil();
  const [display, setDisplay] = useState(null);
  const previewable = isPreviewable(file?.type);
  const playable = isPlayable(file?.type);
  const playerRef = useCallback((p) => {
    if (p && !player.playing) p.seekTo(0);
  }, [player.playing]);

  useEffect(() => {
    if (previewable) {
      if (file instanceof File) {
        // blob
        setDisplay(URL.createObjectURL(file));
      } else if (file.path.match('/')) {
        // url
        setDisplay(file.path);
      } else {
        // uploads
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
      {...!playable && {
        style: { backgroundImage: `url('${display}')` },
      }}
    >
      {playable && (
        <ReactPlayer
          ref={playerRef}
          url={display}
          width="100%"
          height="100%"
          controls={false}
          {...player}
        />
      )}
      <div className="position-absolute w-100 h-100 start-0 top-0" />
    </div>
  );
};

export default FilPreview;
