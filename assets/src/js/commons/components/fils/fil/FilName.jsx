import React from 'react';

import useFil from './useFil';

const FilName = ({
  className = 'link-dark',
  link,
}) => {
  const { file: { name = '', path } } = useFil();
  const [, n, ext] = name.match(/(.*?)(\.[^.]*)$/);
  let href = null;

  if (link) {
    if (typeof link === 'string') {
      href = link;
    } else if (path) {
      href = `/uploads/${path}`;
    }
  }

  const content = (
    <div className="w-100 d-inline-flex flex-nowrap">
      <div
        className="text-truncate"
        style={{ flex: '0 1 content' }}
      >
        {n}
      </div>
      <div
        style={{
          flex: '1 0 content',
          whiteSpace: 'nowrap',
        }}
      >
        {ext}
      </div>
    </div>
  );

  return href ? (
    <a
      className={className}
      target="_blank"
      href={`/uploads/${path}`}
      rel="noreferrer"
    >
      {content}
    </a>
  ) : content;
};

export default FilName;
