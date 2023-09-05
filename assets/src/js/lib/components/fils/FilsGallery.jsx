import React from 'react';

import Fil, { previewables } from './fil';
import Slider from '../slider';

const FilsGallery = ({
  files: list,
  thumbsLimit = 0,
  imgOnly = false,
  gridClassName = 'd-flex flex-wrap gap-2 py-2',
  thumb: thumbProps = {},
}) => {
  const imgs = list.filter((f) => previewables.includes(f.type));
  const files = imgOnly ? imgs : list;
  const thumbs = thumbsLimit
    ? files.slice(0, thumbsLimit)
    : files;
  const more = thumbsLimit && Math.max(files.length - thumbsLimit, 0);

  if (!thumbs.length) return '';

  return (
    <Slider.Lightbox slides={imgs}>
      {({ turnOn }) => (
        <div className={gridClassName}>
          {thumbs.map((t, i) => (
            <Fil key={t._id || t.path} file={t}>
              <Fil.Link
                className="position-relative"
                style={{ width: '152px' }}
                onClick={(evt) => {
                  const s = imgs.findIndex((f) => (
                    (t._id && f._id === t._id) || f.path === t.path
                  ));

                  if (s !== -1) {
                    evt.preventDefault();
                    turnOn(s);
                  }
                }}
                {...thumbProps}
              >
                <Fil.Thumbnail>
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
                </Fil.Thumbnail>
              </Fil.Link>
            </Fil>
          ))}
        </div>
      )}
    </Slider.Lightbox>
  );
};

export default FilsGallery;
