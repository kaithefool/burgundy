import React from 'react';

import Fil from './fil';
import { Slider } from '../slider';

const FilsGallery = ({
  files: list,
  thumbsLimit = 0,
  imgOnly = false,
  gridClassName = 'd-flex flex-wrap gap-2 py-2',
  thumb: thumbProps = {},
}) => {
  const files = imgOnly
    ? list.filter((f) => f.type.match(/^image\//))
    : list;
  const thumbs = thumbsLimit
    ? files.slice(0, thumbsLimit)
    : files;
  const more = thumbsLimit && Math.max(files.length - thumbsLimit, 0);

  if (!thumbs.length) return '';

  return (
    <Slider.Lightbox slides={files}>
      {({ turnOn }) => (
        <div className={gridClassName}>
          {thumbs.map((f, i) => (
            <Fil.Link
              key={f._id || f.path}
              onClick={(evt) => {
                if (turnOn(f)) evt.preventDefault();
              }}
              {...thumbProps}
            >
              <FilsThumbnail file={f}>
                {more > 0 && i >= thumbs.length - 1 && (
                  <div
                    className={`
                      bg-dark bg-opacity-50
                      d-flex align-items-center
                      text-white display-4
                    `}
                  >
                    <div className="text-center w-100">
                      {`+${more}`}
                    </div>
                  </div>
                )}
              </FilsThumbnail>
            </Fil.Link>
          ))}
        </div>
      )}
    </Slider.Lightbox>
  );
};

export default FilsGallery;
