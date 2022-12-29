import React from 'react';

import FilsLightbox from './FilsLightbox';
import FilsThumbnail from './FilsThumbnail';

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
    <FilsLightbox files={files}>
      {({ turnOn }) => (
        <div className={gridClassName}>
          {thumbs.map((f, i) => (
            <a
              key={f._id}
              className="position-relative"
              style={{ width: '152px' }}
              href={`/uploads/${f.path}`}
              target="_blank"
              rel="noreferrer"
              download={f.name}
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
            </a>
          ))}
        </div>
      )}
    </FilsLightbox>
  );
};

export default FilsGallery;
